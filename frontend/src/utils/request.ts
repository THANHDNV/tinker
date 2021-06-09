import fetch from 'isomorphic-fetch';
import buildUrl from 'build-url';
import { IRequestParams } from '../types';

const request = <ReponseDataType, BodyType>(params: IRequestParams<BodyType> = {}) => (): Promise<ReponseDataType> => {
	const {
		url = process.env.REACT_APP_API_URL,
		path = '/',
		method = 'get',
		body
	} = params;
	const userId = localStorage.getItem('user-id')

	const fullUrl = buildUrl(url as string, { path })

	const headers: HeadersInit = new Headers();
	headers.set('app-id', process.env.REACT_APP_APP_ID as string)
	
	if (userId) {
		headers.set('user-id', userId);
	}

	return fetch(fullUrl, {
		method,
		body: JSON.stringify(body),
		headers
	}).then((response) => response.json());
}

export default request;