import { Router } from 'express';
import userRoute from './user';

const router = Router();

router.get('/', (req, res) => {
	return res.send('done')
});

router.use('/user', userRoute);

export default router;