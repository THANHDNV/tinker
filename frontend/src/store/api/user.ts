import { useState } from 'react';
import useCustomSWR from '../../utils/useCustomSwr';
import { IFetchUser, IFetchReturn, IGetListUser, ILazyFetch, IUserDetail } from '../../types';

export const useFetchUsers = ({
	limit = 10,
	page = 0
}: IFetchUser = {}): IFetchReturn<IGetListUser> => {
	const { data, error } = useCustomSWR<IGetListUser>({
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
}: IFetchUser = {}): ILazyFetch<IGetListUser> => {
	const [shouldFetch, setShouldFetch] = useState(false);

	const { data, error } = useCustomSWR<IGetListUser>({
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