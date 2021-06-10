import { Router } from 'express';
import { query } from 'express-validator';
import keyBy from 'lodash.keyby';
import pick from 'lodash.pick';
import { authenticate } from '../middleware';
import {
	getUserList,
	getUser,
	likeUser,
	getPreference,
	getPreferenceList,
	getRandomUserId,
	getPreferenceByIds,
	getLikesToUser
} from '../services';

const router = Router();

router.get(
	'/',
	query('limit').isInt({ min: 0, max: 15 }).toInt(),
	query('page').isInt({ min: 0 }).toInt(),
	async (req, res) => {
		
		const { limit, page } = req.query as any;

		let excludeList = [];

		if (req.headers['user-id']) {
			excludeList.push(req.headers['user-id'] as string)
		}

		const userList = await getUserList({ limit: limit, page: page }, excludeList);

		// get list of showed users in fetched list

		const showedList: string[] = [];
		if (req.headers['user-id']) {
			showedList.push(...await getPreferenceByIds(req.headers['user-id'] as string, userList.data.map((user) => user.id)))
		}

		// send user list
		return res.json({
			...userList,
			showed: showedList
		});
	}
)

router.use(
	'/login',
	async (req, res) => {
		const userId: string = req.headers["user-id"] as string;

		try {
			const user = await getUser(userId);

			if (user) {
				return res.json(user);
			}
		} catch(error) {
			// not found, ignore
			return res.sendStatus(500);
		}

		return res.json(await getRandomUserId())
	}
)

router.get(
	'/preference',
	authenticate,
	query('limit').isInt({ min: 0, max: 15 }).toInt(),
	query('page').isInt({ min: 0 }).toInt(),
	async (req, res) => {
		const userId: string = req.headers["user-id"] as string;
		const { limit, page } = req.query;

		const { data, ...rest } = await getPreferenceList(userId, { limit: limit as any, page: page as any });
		const matchedList = keyBy(await getLikesToUser(
			data.filter((p) => p.isLiked).map((p) => p.targetId),
			userId
		));

		return res.json({
			data: data.map((p) => ({
				...pick(p, ["userId", "targetId", "isLiked", "target"]),
				matched: !!matchedList[p.targetId]
			})),
			...rest
		});
	}
)

const likePassUser = (like: boolean) => async (req: any, res: any) => {
	const userId: string = req.headers["user-id"] as string;
	const { id } = req.body;

	const isLiked = await getPreference(userId, id);

	if (typeof isLiked === 'boolean') {
		return res.status(409).send(`User already ${isLiked ? 'liked' : 'passed'}`)
	}

	const result = await likeUser(userId, id, like);

	return res.json({
		id: result.targetId,
		isLiked: result.isLiked
	})
}

router.post('/like',
	authenticate,
	likePassUser(true)
)

router.post('/pass',
	authenticate,
	likePassUser(false)
)

router.get(
	'/:id',
	async (req, res) => {
		const { id } = req.params;

		// send user detail
		return res.json(await getUser(id));
	}
)

export default router;