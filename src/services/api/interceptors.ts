import {
	type AxiosInstance,
	type AxiosError,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from 'axios';
import { get, has, includes, noop } from 'lodash';
import { objectToSnake, objectToCamel as tsToCamel } from 'ts-case-convert';

const objectToCamel = (data: unknown) => {
	if (typeof data === 'object' && data !== null) {
		return tsToCamel(data);
	}

	return data;
};

// interface AxiosRequestConfigRetryable extends InternalAxiosRequestConfig {
// 	isRetry?: boolean;
// }

declare module 'axios' {
	export interface AxiosRequestConfig {
		bypassCaseConversion?: boolean;
	}
}

const reqSnakeCase = (config: InternalAxiosRequestConfig) => {
	return { ...config, data: objectToSnake(config.data) };
};

const resCamelCase = (response: AxiosResponse) => {
	return { ...response, data: objectToCamel(response.data) };
};

const resCamelCaseBypass = (response: AxiosResponse) => {
	return { ...response, data: objectToCamel(response.data) };
};

const beginLogout = (): Promise<never> => {
	// if (window.location.pathname !== paths.logout) {
	//     window.location.pathname = paths.logout
	// }

	return new Promise(noop);
};

const auxResErrorHandler = (error: Error | AxiosError) => {
	const isAxiosError = get(error, 'isAxiosError', false);
	const status: number | false = get(error, 'response.status', false);

	if (!isAxiosError || includes([401, 403], status)) {
		return Promise.reject(error);
	}

	return beginLogout();
};

const resErrorHandler = (
	client: AxiosInstance,
	auxClient: AxiosInstance,
	error: Error | AxiosError,
) => {
	const isAxiosError = get(error, 'isAxiosError', false);
	if (!isAxiosError) {
		return Promise.reject(error);
	}

	const { response, config: originalRequest } = error as AxiosError;
	const shouldRetry = originalRequest !== undefined;
	if (!shouldRetry) {
		return Promise.reject(error);
	}

	if (!has(response, 'data') || !has(response, 'status')) {
		return Promise.reject(error);
	}

	const { data, status } = response;

	if (
		!includes([401, 403], status) ||
		(shouldRetry && get(originalRequest, 'isRetry', false))
	) {
		const modifiedError = {
			...error,
			response: { ...response, data: objectToCamel(data) },
		};
		return Promise.reject(modifiedError);
	}

	return Promise.resolve(client(originalRequest));
};

export {
	reqSnakeCase,
	resCamelCase,
	resCamelCaseBypass,
	auxResErrorHandler,
	resErrorHandler,
};
