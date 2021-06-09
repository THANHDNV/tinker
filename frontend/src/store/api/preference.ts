import { useEffect, useState, useCallback } from 'react';
import { IPreference } from '../../types'
import request from '../../utils/request';

interface ILikeUser {
	data?: IPreference,
	loading: boolean;
	error?: Error;
	likeUser: (isLiked: boolean, id: string) => void;
}

export const useLike = (): ILikeUser => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState<IPreference>();
	const [error, setError] = useState<Error>();

	const [isLiked, setIsLiked] = useState<boolean>();
	const [id, setId] = useState<string>();

	const [isSetFlag, setIsSetFlag] = useState<boolean>( false);

	const like = useCallback(request<IPreference, unknown>({
		path: '/user/like',
		method: 'post',
		body: { id }
	}), [id]);

	const pass = useCallback(request<IPreference, unknown>({
		path: '/user/pass',
		method: 'post',
		body: { id }
	}), [id]);

	useEffect(() => {
		if (isSetFlag) {
			setIsSetFlag(false);

			const f = isLiked ? like : pass;

			f().then((response) => {
				setData(response)
				setError(undefined);
			}).catch((error) => {
				setData(undefined);
				setError(error);
			}).finally(() => {
				setIsLoading(false);
			})
		}
	}, [isSetFlag, isLiked, like, pass])

	const onLike = (isLiked: boolean, userId: string) => {
		if (userId) {
			setIsLoading(true);

			setId(userId);
			setIsLiked(isLiked)

			setIsSetFlag(true);
		}
	}

	return {
		likeUser: onLike,
		data,
		loading: isLoading,
		error
	};
}