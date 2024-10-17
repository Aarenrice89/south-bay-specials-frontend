import { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { get, isNil } from 'lodash';
import { type ZodType } from 'zod';
import { client } from './clients';
import { validate } from './validate';

type ZodGet = <T>(
	url: string,
	schema: ZodType<T>,
	config?: AxiosRequestConfig<T>,
	path?: string,
) => Promise<AxiosResponse<T>>;

type ZodPost = <T, D = unknown>(
	url: string,
	data: D,
	responseSchema: ZodType<T>,
	config?: AxiosRequestConfig<D>,
	path?: string,
) => Promise<AxiosResponse<T>>;

type ZodPatch = ZodPost;

const zodGet: ZodGet = (url, schema, config, path) => {
	const dataPath = isNil(path) ? 'data' : path;

	return client
		.get(url, config)
		.then((response) => {
			response.data = validate(schema, get(response, dataPath), false);
			return Promise.resolve(response);
		})
		.catch((e) => {
			return Promise.reject(e);
		});
};

const zodPost: ZodPost = (url, data, responseSchema, config, path) => {
	const dataPath = isNil(path) ? 'data' : path;

	return client
		.post(url, data, config)
		.then((response) => {
			response.data = validate(
				responseSchema,
				get(response, dataPath),
				false,
			);
			return Promise.resolve(response);
		})
		.catch((e) => {
			return Promise.reject(e);
		});
};

const zodPatch: ZodPatch = (url, data, responseSchema, config, path) => {
	const dataPath = isNil(path) ? 'data' : path;

	return client
		.patch(url, data, config)
		.then((response) => {
			response.data = validate(
				responseSchema,
				get(response, dataPath),
				false,
			);
			return Promise.resolve(response);
		})
		.catch((e) => {
			return Promise.reject(e);
		});
};

export { zodGet, zodPost, zodPatch };
