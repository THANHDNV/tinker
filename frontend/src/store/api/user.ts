import { useState } from 'react';
import useCustomSWR from '../../utils/useCustomSwr';

interface IFetchUser {
	limit?: number;
	page?: number;
}

const FETCH_USER_DEFAULT = {
	limit: 10,
	page: 0
}

export const useFetchUsers = (params: IFetchUser = FETCH_USER_DEFAULT) => {
	const { data, error } = useCustomSWR({
		path: '/user',
		query: params
	})

	return {
		data,
		error,
		loading: !data && !error
	}
}


export const useLazyFetchUserDetail = (id: string) => {
	const [shouldFetch, setShouldFetch] = useState(false);

	const { data, error } = useCustomSWR({
		path: `/user/${id}`,
		shouldFetch
	})

	return {
		setFetch: setShouldFetch,
		data,
		error,
		loading: !data && !error
	}
}