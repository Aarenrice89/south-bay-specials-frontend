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
import type {
	PingResponse,
	FormattedLocation,
	newSpecialRequest,
	LocationsQueryParams,
	groupedSpecialResponse,
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
		zodGet<groupedSpecialResponse[]>(
			Endpoints.groupedSpecial(searchParams.toString()),
			z.array(groupedSpecialResponseSchema),
		),
	);
};

export const postNewSpecial = (data: newSpecialRequest) => {
	// eslint-disable-next-line no-console
	console.log('new data', data);
	return zodPost(Endpoints.specials, data, newSpecialResponseSchema);
};
