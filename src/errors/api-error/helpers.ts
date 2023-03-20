import {
	CustomApiError,
	TOO_MANY_REQUESTS_HTTP_CODE,
	UNAUTHORIZED_HTTP_CODE,
} from ".";

export const isUnauthorizedError = (error: any) =>
	error instanceof CustomApiError &&
	error.statusCode === UNAUTHORIZED_HTTP_CODE;

export const isTooManyRequestsError = (error: any) =>
	error instanceof CustomApiError &&
	error.statusCode === TOO_MANY_REQUESTS_HTTP_CODE;
