import { pingSchema, locationListSchema } from 'types/schemas';
import Endpoints from './endpoints';
import { zodGet } from './zodMethods';
import type { PingResponse, LocationListResponse } from 'types';

export const getTest = () => {
	return zodGet<PingResponse>(Endpoints.test, pingSchema);
};

export const getLocations = () => {
	return zodGet<LocationListResponse>(
		Endpoints.locations,
		locationListSchema,
	);
};
