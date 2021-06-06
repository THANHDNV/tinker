import { useState } from 'react';
import useCustomSWR from '../../utils/useCustomSwr';

interface IFetchUser {
	limit?: number;
	page?: number;
}

interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	picture: string;
}

interface IGetListUser {
	data: IUser[];
	limit: number;
	offset: number;
	page: number;
	total: number;
}

interface IUserDetail extends IUser {
	dateOfBirth: string;
	gender: "male" | "female" | "other" | "";
}

interface IFetchReturn<DataType, ErrorType = Error> {
	data?: DataType;
	error?: ErrorType;
	loading: boolean;
}

interface ILazyFetch<DataType, ErrorType = Error> extends IFetchReturn<DataType, ErrorType> {
	isFetching: boolean,
	setFetch: (fetch: boolean) => void,
}

export const useFetchUsers = ({
	limit = 10,
	page = 0
}: IFetchUser = {}): IFetchReturn<IGetListUser> => {
	const { data, error } = useCustomSWR<IGetListUser>({
		path: '/user',
		query: {
			limit: limit.toString(),
			page: page.toString()
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
}: IFetchUser = {}): ILazyFetch<IGetListUser> => {
	const [shouldFetch, setShouldFetch] = useState(false);

	const { data, error } = useCustomSWR<IGetListUser>({
		path: '/user',
		query: {
			limit: limit.toString(),
			page: page.toString()
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


export const useLazyFetchUserDetail = (id: string): ILazyFetch<IUserDetail> => {
	const [shouldFetch, setShouldFetch] = useState(false);

	const { data, error } = useCustomSWR<IUserDetail>({
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