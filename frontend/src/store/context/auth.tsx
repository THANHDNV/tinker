import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { IUserDetail } from '../../types';
import { useLogin } from '../api/authenticate';

interface IAuthContext {
	reAuth?: () => void;
	auth?: IUserDetail;
	loading: boolean;
	error?: Error;
}

const DEFAULT_AUTH_CONTEXT = {
	loading: false
}

const AuthContext = createContext<IAuthContext>(DEFAULT_AUTH_CONTEXT);

export const AuthProvider = ({ children }: React.PropsWithChildren<unknown>): JSX.Element => {
	const { login, data, loading, error } = useLogin();

	const value = useMemo(() => ({
		reAuth: login,
		auth: data,
		loading,
		error
	}), [data, loading, error]);

	useEffect(() => {
		login();
	}, []);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = (): IAuthContext => useContext(AuthContext);