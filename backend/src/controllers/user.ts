import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	const { limit, page } = req.query;

	// send user list
	return res.json({
		
	})
})

router.get('/:id', (req, res) => {
	const { id } = req.params;

	// send user detail
	return res.json({

	})
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