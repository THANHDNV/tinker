import { Preference, User } from '../../models';
import { PreferenceAttribute } from '../../models/preference';
import { IGetList, IGetListResult } from '../types';

export const getPreference = async (
	userId: string,
	targetId: string
): Promise<boolean | null> => {
	const result = await Preference.findAll({
		attributes: ["isLiked"],
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

export const getPreferenceByIds = async (
	userId: string,
	targetIds: string[]
) => {
	const result = await Preference.findAll({
		attributes: ["targetId", "isLiked"],
		where: {
			userId,
			targetId: targetIds
		}
	});

	return result.map((r) => r.targetId);
}

export const getPreferenceList = async (
	userId: string,
	{ page = 0, limit = 10 }: IGetList = {}
): Promise<IGetListResult<Omit<PreferenceAttribute, "id">>> => {
	const offset = page * limit;

	const result = await Preference.findAndCountAll({
		attributes: ["userId", "targetId", "isLiked"],
		where: {
			userId
		},
		include: [{
			model: User,
			as: 'target'
		}],
		order: [["createdAt", "DESC"]],
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
): Promise<Omit<PreferenceAttribute, "id">> => {
	const result = await Preference.create({
		userId: currentUserId,
		targetId: targetUserId,
		isLiked
	});

	return result;
}

export const getLikesToUser = async (
	userIds: string[],
	targetId: string
): Promise<string[]> =>  {
	const result = await Preference.findAll({
		where: {
			userId: userIds,
			targetId,
			isLiked: true
		}
	});

	return result.map((p) => p.userId);
}