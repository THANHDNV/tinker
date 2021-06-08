import { User } from '../models';
import { UserAttributes } from '../models/user';

interface IGetList {
	page?: number;
	limit?: number;
}

interface IGetListResult<T> {
	data: T[];
	limit: number;
	offset: number;
	page: number;
	total: number;
}

export const getUserList = async ({ page = 0, limit = 10 }: IGetList = {}): Promise<IGetListResult<UserAttributes>> => {
	const offset = page * limit;
	const result = await User.findAndCountAll({
		limit,
		offset
	});

	return {
		data: result.rows,
		limit,
		offset,
		page,
		total: result.count
	}
}

export const getUser = async (id: string) => {
	return User.findByPk(id);
}