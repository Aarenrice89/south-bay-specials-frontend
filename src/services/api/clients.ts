import axios from 'axios';

import { BASE_URL, TIMEOUT } from './constants';
import {
	auxResErrorHandler,
	reqSnakeCase,
	resCamelCase,
	resCamelCaseBypass,
	resErrorHandler,
} from './interceptors';

const auxilaryClient = axios.create({
	baseURL: BASE_URL,
	timeout: TIMEOUT,
	withCredentials: true,
});

const client = axios.create({
	baseURL: BASE_URL,
	timeout: TIMEOUT,
	withCredentials: true,
});

// attach interceptors
auxilaryClient.interceptors.request.use(reqSnakeCase);
auxilaryClient.interceptors.response.use(resCamelCase, auxResErrorHandler);

client.interceptors.request.use(reqSnakeCase);
client.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('authTokens');
		if (token) {
			const parsedToken = JSON.parse(token);
			// eslint-disable-next-line no-param-reassign
			config.headers.Authorization = `Bearer ${parsedToken.access}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

client.interceptors.response.use(resCamelCaseBypass, (error) =>
	resErrorHandler(client, auxilaryClient, error),
);

export { client, auxilaryClient };
