export interface IFetchReturn<DataType, ErrorType = Error> {
	data?: DataType;
	error?: ErrorType;
	loading: boolean;
}

export interface ILazyFetch<DataType, ErrorType = Error> extends IFetchReturn<DataType, ErrorType> {
	isFetching: boolean,
	setFetch: (fetch: boolean) => void,
}