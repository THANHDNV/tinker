import useSWR from 'swr';
import buildUrl from 'build-url';
import request from './request';

interface ICustomSWR {
	path: string;
	method?: string;
	query?: any;
}

const useCustomSWR = ({
	path,
	method = 'get',
	query
}: ICustomSWR) => {
	const fullUrl = buildUrl('', {
		path,
		queryParams: query
	})

	return useSWR(
		fullUrl,
		request({
			path: fullUrl,
			method
		})
	)
}

export default useCustomSWR;