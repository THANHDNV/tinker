import useSWR from 'swr';
import buildUrl from 'build-url';
import request from './request';

interface ICustomSWR {
	path: string;
	method?: string;
	query?: any;
	shouldFetch?: boolean
}

const useCustomSWR = ({
	path,
	method = 'get',
	query,
	shouldFetch = true
}: ICustomSWR) => {
	const fullUrl = buildUrl('', {
		path,
		queryParams: query
	})

	return useSWR(
		shouldFetch ? fullUrl : null,
		request({
			path: fullUrl,
			method
		})
	)
}

export default useCustomSWR;