import { useState } from 'react';
import useCustomSWR from '../../utils/useCustomSwr';
import { IFetchPagination, IFetchReturn, ILazyFetch, IUserDetail, IFetchListResponse, IUser } from '../../types';

interface IFetchUsersListResponse extends IFetchListResponse<IUser> {
	showed: string[];
}

export const useFetchUsers = ({
	limit = 10,
	page = 0
}: IFetchPagination = {}): IFetchReturn<IFetchUsersListResponse> => {
	const { data, error } = useCustomSWR<IFetchUsersListResponse>({
		path: '/user',
		query: {
			limit: limit.toString(),
			page: page.toString()
		}
	})

	return {
		data,
		error,
		loading: !data && !error
	}
}

export const useLazyFetchUsers = ({
	limit = 10,
	page = 0
}: IFetchPagination = {}): ILazyFetch<IFetchUsersListResponse> => {
	const [shouldFetch, setShouldFetch] = useState(false);

	const { data, error } = useCustomSWR<IFetchUsersListResponse>({
		path: '/user',
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


export const useLazyFetchUserDetail = (id: string): ILazyFetch<IUserDetail> => {
	const [shouldFetch, setShouldFetch] = useState(false);

	const { data, error } = useCustomSWR<IUserDetail>({
		path: `/user/${id}`,
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