import { useState } from 'react';
import useCustomSWR from '../../utils/useCustomSwr';

interface IFetchUser {
	limit?: number;
	page?: number;
}

export const useFetchUsers = ({
	limit = 10,
	page = 0
}: IFetchUser = {}) => {
	const { data, error } = useCustomSWR({
		path: '/user',
		query: {
			limit,
			page
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
}: IFetchUser = {}) => {
	const [shouldFetch, setShouldFetch] = useState(false);

	const { data, error } = useCustomSWR({
		path: '/user',
		query: {
			limit,
			page
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


export const useLazyFetchUserDetail = (id: string) => {
	const [shouldFetch, setShouldFetch] = useState(false);

	const { data, error } = useCustomSWR({
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