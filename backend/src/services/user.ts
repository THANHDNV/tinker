import { Op, Sequelize } from 'sequelize';
import { User } from '../../models';
import { UserAttributes } from '../../models/user';
import { IGetList, IGetListResult } from '../types';

export const getUserList = async (
	{ page = 0, limit = 10 }: IGetList = {},
	excludeList: string[] = []
): Promise<IGetListResult<Pick<UserAttributes, "id" | "firstName" | "lastName" | "picture">>> => {
	const offset = page * limit;
	const result = await User.findAndCountAll({
		where: {
			id: {
				[Op.not]: excludeList
			}
		},
		attributes: ["id", "firstName", "lastName", "picture"],
		limit,
		offset,
	});

	return {
		data: result.rows,
		limit,
		offset,
		page,
		total: result.count
	}
}

export const getUser = async (id: string): Promise<UserAttributes | null> => {
	return User.findByPk(id);
}

export const getRandomUserId = async (): Promise<UserAttributes> => {
	const users = await User.findAll({
		limit: 1,
		order: Sequelize.literal(`random()`)
	})

	return users[0];
}