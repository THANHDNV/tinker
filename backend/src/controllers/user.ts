import { Router, Request, Response } from 'express';
import { query, checkSchema } from 'express-validator';
import { getUserList, getUser } from '../services';

const router = Router();

router.get(
	'/',
	checkSchema({
		limit: {
			in: ["query"],
			isInt: {
				options: {
					max: 15,
					min: 0
				}
			}
		},
		page: {
			in: ['query'],
			isInt: {
				options: {
					min: 0
				}
			}
		}
	}),
	async (req: Request, res: Response) => {
	const { limit, page } = req.query;

	// send user list
	return res.json(await getUserList({ limit: limit as any, page: page as any }));
})

router.get(
	'/:id',
	async (req, res) => {
	const { id } = req.params;

	// send user detail
	return res.json(await getUser(id));
})

router.post('/like', (req, res) => {
	const { id } = req.body;

	// like a user
})

router.post('/pass', (req, res) => {
	const { id } = req.body;

	// pass a user
})

export default router;