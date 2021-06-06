import useSWR, { SWRResponse } from 'swr';
import buildUrl from 'build-url';
import request from './request';

interface ICustomSWR {
	path: string;
	method?: string;
	query?: {
		[name: string]: string | string[]
	};
	shouldFetch?: boolean
}

const useCustomSWR = <ReponseDataType, BodyType = never, ErrorType = Error>({
	path,
	method = 'get',
	query,
	shouldFetch = true
}: ICustomSWR): SWRResponse<ReponseDataType, ErrorType> => {
	const fullUrl = buildUrl('', {
		path,
		queryParams: query
	})

	return useSWR<ReponseDataType, ErrorType>(
		shouldFetch ? fullUrl : null,
		request<ReponseDataType, BodyType>({
			path: fullUrl,
			method
		})
	)
}

export default useCustomSWR;