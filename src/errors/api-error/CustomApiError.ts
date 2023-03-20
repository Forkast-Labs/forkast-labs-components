export interface CustomApiError {
	statusCode: number;
	message: string;
	details: string;
	code: string;
}

export class CustomApiError extends Error implements CustomApiError {
	constructor(
		statusCode: number,
		message: string,
		details = "",
		// https://nodejs.org/docs/latest-v15.x/api/errors.html#nodejs-error-codes
		code = ""
	) {
		super();

		this.statusCode = statusCode;
		this.message = message;
		this.details = details;
		this.name = "Custom API error";
		this.code = code;
	}
}
