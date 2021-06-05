import fetch from 'isomorphic-fetch';
import buildUrl from 'build-url';

interface IRequestParams {
	url?: string;
	path?: string;
	method?: string;
	body?: any;
}

const request = (params: IRequestParams = {}) => () => {
	const {
		url = process.env.REACT_APP_API_URL,
		path = '/',
		method = 'get',
		body
	} = params;

	const fullUrl = buildUrl(url as string, { path })

	const headers: any = {
		'app-id': process.env.REACT_APP_APP_ID
	}

	return fetch(fullUrl, {
		method,
		body,
		headers
	}).then((response) => response.json());
}

export default request;