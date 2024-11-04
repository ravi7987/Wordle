/* 
Controller Layer response object interface
this object will be used  by the  controller layer 
to embed the response body sent via http protocol
 */
export interface IClientResponse<T> {
	success: boolean;
	errorMsg: string;
	successMsg: string;
	errors?: string[];
	response: T | undefined;
	data?: T | undefined;
}

/* 
Service Layer response object interface
this object will be used  by the  service layer 
to return a response to controller layer 
 */
export interface IServiceResponse<T> {
	errorMessage: string;
	internalError: boolean;
	response: T;
	success: boolean;
	error: any;
}

/* 
Repository Layer response object interface
this object will be used  by the  respository layer 
to return a response to service layer 
 */
export interface IRepoResponse<T> {
	response: T;
}