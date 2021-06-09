import { Router } from 'express';
import { query } from 'express-validator';
import { authenticate } from '../middleware';
import {
	getUserList,
	getUser,
	likeUser,
	getPreference,
	getPreferenceList,
	getRandomUserId,
	getPreferenceUserIdList
} from '../services';

const router = Router();

router.get(
	'/',
	query('limit').isInt({ min: 0, max: 15 }),
	query('page').isInt({ min: 0 }),
	async (req, res) => {
		
		const { limit, page } = req.query as any;

		const excludeList = [];

		if (req.headers['user-id']) {
			excludeList.push(...await getPreferenceUserIdList(req.headers['user-id'] as string));
		}

		// send user list
		return res.json(await getUserList({ limit: limit, page: page }, excludeList));
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
	query('limit').isInt({ min: 0, max: 15 }),
	query('page').isInt({ min: 0 }),
	async (req, res) => {
		const userId: string = req.headers["user-id"] as string;
		const { limit, page } = req.query as any;
		return res.json(await getPreferenceList(userId, { limit: limit, page: page }));
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