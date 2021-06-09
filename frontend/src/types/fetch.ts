export interface IFetchReturn<DataType, ErrorType = Error> {
	data?: DataType;
	error?: ErrorType;
	loading: boolean;
}

export interface ILazyFetch<DataType, ErrorType = Error> extends IFetchReturn<DataType, ErrorType> {
	isFetching: boolean,
	setFetch: (fetch: boolean) => void,
}

export interface IFetchPagination {
	limit?: number;
	page?: number;
}

export interface IFetchListResponse<T> {
	data: T[];
	limit: number;
	offset: number;
	page: number;
	total: number;
}