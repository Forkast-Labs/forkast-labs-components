import { CustomApiError, NOT_FOUND, DATA_MISSED_CODE } from "errors/api-error";
import { HttpResponse } from "services/HttpClient";

export const processResponse = <T, R>(
	response: HttpResponse<T>,
	formatter: (data: T | null) => R
) => {
	const { parsedBody, status } = response;

	if (status === 204) {
		return formatter(null);
	}

	if (!parsedBody) {
		throw new CustomApiError(NOT_FOUND, "Missed data.", "", DATA_MISSED_CODE);
	}

	return formatter(parsedBody);
};
