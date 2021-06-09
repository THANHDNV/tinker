export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	picture: string;
}

export interface IGetListUser {
	data: IUser[];
	limit: number;
	offset: number;
	page: number;
	total: number;
}

export interface IUserDetail extends IUser {
	dateOfBirth: string;
	gender: "male" | "female" | "other" | "";
}