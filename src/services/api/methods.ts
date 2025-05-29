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
	RefreshToken,
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

export const getGroupedSpecials = (
	params: Partial<LocationsQueryParams> = {},
) => {
	const defaultParams: LocationsQueryParams = {
		dayOfWeek: [],
		search: '',
	};
	const mergedParams = { ...defaultParams, ...params };
	// Ensure dayOfWeek values are lowercase
	if (Array.isArray(mergedParams.dayOfWeek)) {
		mergedParams.dayOfWeek = mergedParams.dayOfWeek.map((d) =>
			typeof d === 'string' ? d.toLowerCase() : d,
		);
	}
	const searchParams = new URLSearchParams();
	Object.entries(mergedParams).forEach(([key, value]) => {
		if (
			!isNil(value) &&
			!(
				(typeof value === 'string' && value === '') ||
				(Array.isArray(value) && value.length === 0)
			)
		) {
			if (Array.isArray(value)) {
				value.forEach((v) => {
					searchParams.append(snakeCase(key), v as string);
				});
			} else {
				searchParams.append(snakeCase(key), value as string);
			}
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

export const postRefreshToken = (data: RefreshToken) => {
	return client.post<LoginUserResponse>(Endpoints.refresh, data);
};
