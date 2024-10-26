import { isNil, snakeCase } from 'lodash';
import {
	pingSchema,
	locationListSchema,
	locationQueryParamsSchema,
	newSpecialResposneSchema,
} from 'types/schemas';
import Endpoints from './endpoints';
import { zodGet, zodPost } from './zod-methods';
import { validateAsync } from './validate';
import type {
	PingResponse,
	LocationListResponse,
	NewSpecial,
	LocationsQueryParams,
} from 'types';

export const getTest = () => {
	return zodGet<PingResponse>(Endpoints.test, pingSchema);
};

export const getLocations = (params: LocationsQueryParams) => {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (!isNil(value) && value !== '') {
			searchParams.append(snakeCase(key), value);
		}
	});
	return validateAsync(locationQueryParamsSchema, params).then(() =>
		zodGet<LocationListResponse>(
			Endpoints.locations(searchParams.toString()),
			locationListSchema,
		),
	);
};

export const postNewSpecial = (data: NewSpecial) => {
	// eslint-disable-next-line no-console
	console.log('new data', data);
	return zodPost(Endpoints.specials, data, newSpecialResposneSchema);
};
