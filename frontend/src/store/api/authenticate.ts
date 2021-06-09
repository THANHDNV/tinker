import { useState } from 'react';
import { IUserDetail } from '../../types/user'
import request from '../../utils/request';

interface IUseLogin {
	data?: IUserDetail,
	loading: boolean;
	error?: Error;
	login: () => void;
}

export const useLogin = (): IUseLogin => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [authData, setAuthData] = useState<IUserDetail>();
	const [error, setError] = useState<Error>();

	const login = request<IUserDetail, unknown>({
		path: '/user/login',
		method: 'get'
	});

	const onLogin = () => {
		setIsLoading(true);
		login().then((response) => {
			localStorage.setItem('user-id', response.id)
			setAuthData(response)
			setError(undefined);
		}).catch((error) => {
			setAuthData(undefined);
			setError(error);
		}).finally(() => {
			setIsLoading(false);
		})
	}

	return {
		login: onLogin,
		data: authData,
		loading: isLoading,
		error
	};
}