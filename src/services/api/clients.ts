import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

import { BASE_URL, TIMEOUT } from './constants';
import Endpoints from './endpoints';
import {
	auxResErrorHandler,
	reqSnakeCase,
	resCamelCase,
	resErrorHandler,
} from './interceptors';
import type { LoginUserResponse } from 'types';

const auxClient = axios.create({
	baseURL: BASE_URL,
	timeout: TIMEOUT,
	withCredentials: true,
});

let authTokens = localStorage.getItem('authTokens')
	? JSON.parse(localStorage.getItem('authTokens') as string)
	: null;

const client = axios.create({
	baseURL: BASE_URL,
	timeout: TIMEOUT,
	withCredentials: true,
	headers: { Authorization: `Bearer ${authTokens?.access}` },
});

// attach interceptors
auxClient.interceptors.request.use(reqSnakeCase);
auxClient.interceptors.response.use(resCamelCase, auxResErrorHandler);

client.interceptors.request.use(reqSnakeCase);
client.interceptors.request.use(async (req) => {
	if (!authTokens) {
		authTokens = localStorage.getItem('authTokens')
			? JSON.parse(localStorage.getItem('authTokens') as string)
			: null;
		req.headers.Authorization = `Bearer ${authTokens?.access}`;
	}

	const user = jwtDecode(authTokens.access) as { exp?: number };
	const isExpired =
		typeof user.exp === 'number'
			? dayjs.unix(user.exp).diff(dayjs()) < 1
			: true;

	if (!isExpired) return req;

	// Wait for the refresh to complete and update the token
	const response = await auxClient.post<LoginUserResponse>(
		Endpoints.refresh,
		{
			refresh: authTokens.refresh,
		},
	);
	localStorage.setItem('authTokens', JSON.stringify(response.data));
	authTokens = response.data;
	req.headers.Authorization = `Bearer ${response.data.access}`;
	return req;
});

client.interceptors.response.use(resCamelCase, resErrorHandler);

export { client, auxClient };
