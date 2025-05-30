import {
	type AxiosError,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from 'axios';
import { get, includes, noop } from 'lodash';
import { objectToSnake, objectToCamel as tsToCamel } from 'ts-case-convert';
import { paths } from 'enums';

const objectToCamel = (data: unknown) => {
	if (typeof data === 'object' && data !== null) {
		return tsToCamel(data);
	}

	return data;
};

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

const resErrorHandler = (error: Error | AxiosError) => {
	const isAxiosError = get(error, 'isAxiosError', false);
	const status: number | false = get(error, 'response.status', false);
	if (!isAxiosError || includes([401, 403], status)) {
		localStorage.removeItem('authTokens');
		window.location.href = paths.root;
		return Promise.reject(error);
	}
	return beginLogout();
};

export {
	reqSnakeCase,
	resCamelCase,
	resCamelCaseBypass,
	auxResErrorHandler,
	resErrorHandler,
};
