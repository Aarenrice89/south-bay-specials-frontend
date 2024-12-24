import { z } from 'zod';
import { isNil, snakeCase } from 'lodash';
import {
	pingSchema,
	locationListSchema,
	locationQueryParamsSchema,
	newSpecialResponseSchema,
	groupedSpecialResponseSchema,
} from 'schemas';
import Endpoints from './endpoints';
import { zodGet, zodPost } from './zod-methods';
import { validateAsync } from './validate';
import { auxilaryClient, client } from './clients';
import type {
	PingResponse,
	FormattedLocation,
	NewSpecialRequest,
	LocationsQueryParams,
	GroupedSpecialResponse,
	RegisterNewUser,
	LoginUser,
	LoginUserResponse,
	RegisterNewUserResponse,
} from 'types';

export const getTest = () => {
	return zodGet<PingResponse>(Endpoints.test, pingSchema);
};

export const getLocations = (params: LocationsQueryParams) => {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (!isNil(value) && value !== '') {
			searchParams.append(snakeCase(key), value as string);
		}
	});
	return validateAsync(locationQueryParamsSchema, params).then(() =>
		zodGet<FormattedLocation[]>(
			Endpoints.locations(searchParams.toString()),
			locationListSchema,
		),
	);
};

export const getGroupedSpecials = (params: LocationsQueryParams) => {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (!isNil(value) && value !== '') {
			searchParams.append(snakeCase(key), value as string);
		}
	});
	return validateAsync(locationQueryParamsSchema, params).then(() =>
		zodGet<GroupedSpecialResponse[]>(
			Endpoints.groupedSpecial(searchParams.toString()),
			z.array(groupedSpecialResponseSchema),
		),
	);
};

export const postNewSpecial = (data: NewSpecialRequest) => {
	return zodPost(Endpoints.specials, data, newSpecialResponseSchema);
};

export const postRegisterNewUser = (data: RegisterNewUser) => {
	return auxilaryClient.post<RegisterNewUserResponse>(
		Endpoints.register,
		data,
	);
};

export const postLoginUser = (data: LoginUser) => {
	return auxilaryClient.post<LoginUserResponse>(Endpoints.login, data);
};

export const postRefreshToken = (refreshToken: string) => {
	return client.post<LoginUserResponse>(Endpoints.refresh, refreshToken);
};
