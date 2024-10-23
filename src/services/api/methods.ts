import {
	pingSchema,
	locationListSchema,
	newSpecialSchema,
} from 'types/schemas';
import Endpoints from './endpoints';
import { zodGet, zodPost } from './zod-methods';
import type { PingResponse, LocationListResponse, NewSpecial } from 'types';

export const getTest = () => {
	return zodGet<PingResponse>(Endpoints.test, pingSchema);
};

export const getLocations = () => {
	return zodGet<LocationListResponse>(
		Endpoints.locations,
		locationListSchema,
	);
};

export const postNewSpecial = (data: NewSpecial) => {
	return zodPost(Endpoints.specials, data, newSpecialSchema);
};
