import useCustomSWR from '../../utils/useCustomSwr';

interface IFetchUser {
	limit?: number;
	page?: number;
}

const FETCH_USER_DEFAULT = {
	limit: 10,
	page: 0
}

export const useFetchUser = (params: IFetchUser = FETCH_USER_DEFAULT) => {
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