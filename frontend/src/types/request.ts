export interface IRequestParams<BodyType> {
	url?: string;
	path?: string;
	method?: string;
	body?: BodyType;
}