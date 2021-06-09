import { Op, Sequelize } from 'sequelize';
import { User, Preference } from '../../models';
import { UserAttributes } from '../../models/user';
import { PreferenceAttribute } from '../../models/preference';

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

export const getUserList = async ({ page = 0, limit = 10 }: IGetList = {}, exclude: string[] = []): Promise<IGetListResult<UserAttributes>> => {
	const offset = page * limit;
	const result = await User.findAndCountAll({
		where: {
			id: {
				[Op.not]: exclude
			}
		},
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

export const getPreference = async (
	userId: string,
	targetId: string
): Promise<boolean | null> => {
	const result = await Preference.findAll({
		where: {
			userId,
			targetId
		},
		limit: 1
	});

	if (result.length) {
		return result[0].isLiked;
	}

	return null;
}

export const getPreferenceUserIdList = async (
	userId: string
) => {
	const result = await Preference.findAll({
		where: {userId}
	});

	return result.map((r) => r.targetId);
}

export const getPreferenceList = async (
	userId: string,
	{ page = 0, limit = 10 }: IGetList = {}
): Promise<IGetListResult<PreferenceAttribute>> => {
	const offset = page * limit;

	const result = await Preference.findAndCountAll({
		where: {
			userId
		},
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

export const likeUser = async (
	currentUserId: string,
	targetUserId: string,
	isLiked: boolean
): Promise<PreferenceAttribute> => {
	const result = await Preference.create({
		userId: currentUserId,
		targetId: targetUserId,
		isLiked
	});

	return result;
}

export const getRandomUserId = async (): Promise<UserAttributes> => {
	const users = await User.findAll({
		limit: 1,
		order: Sequelize.literal(`random()`)
	})

	return users[0];
}