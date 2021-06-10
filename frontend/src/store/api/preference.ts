import { useEffect, useState, useCallback } from 'react';
import { IPreference, IFetchPagination, IFetchListResponse, ILazyFetch, IUser } from '../../types'
import request from '../../utils/request';
import useCustomSWR from '../../utils/useCustomSwr';

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
		if (isLoading) {
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
	}, [isLoading, isLiked])

	const onLike = useCallback((isLiked: boolean, userId: string) => {
		setIsLoading(true);
		setId(userId);
		setIsLiked(isLiked);
	}, [setIsLoading, setId, setIsLiked]);

	return {
		likeUser: onLike,
		data,
		loading: isLoading,
		error
	};
}

export interface IFetchPreference extends IPreference {
	target: IUser;
	matched: boolean;
}

export const useLazyFetchPreference = ({
	limit = 10,
	page = 0
}: IFetchPagination = {}): ILazyFetch<IFetchListResponse<IFetchPreference>> => {
	const [shouldFetch, setShouldFetch] = useState(false);
	const { data, error } = useCustomSWR<IFetchListResponse<IFetchPreference>>({
		path: '/user/preference',
		query: {
			limit: limit.toString(),
			page: page.toString()
		},
		shouldFetch
	})

	return {
		isFetching: shouldFetch,
		setFetch: setShouldFetch,
		data,
		error,
		loading: !data && !error
	}
}