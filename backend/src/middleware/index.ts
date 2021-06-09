import { Request, Response, NextFunction  } from 'express';
import { getUser } from '../services';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
	let userId = req.headers['user-id'];
	if (!userId) {
		return res.sendStatus(401)
	}

	if (Array.isArray(userId)) {
		if (!userId.length) {
			return res.sendStatus(401);
		}

		// only last header is accepted
		userId = userId[userId.length - 1];
		req.headers['user-id'] = userId[userId.length - 1]
	}

	try {
		const user = await getUser(userId);
		if (!user) {
			return res.sendStatus(401);
		}
	} catch (error) {
		res.sendStatus(500)
	}

	next();
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

	if (err) {
		return res.sendStatus(500);
	}

	return res.sendStatus(404);
}