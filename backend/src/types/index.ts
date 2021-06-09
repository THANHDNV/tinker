export interface IGetList {
	page?: number;
	limit?: number;
}

export interface IGetListResult<T> {
	data: T[];
	limit: number;
	offset: number;
	page: number;
	total: number;
}