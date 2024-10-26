export type {
	PingResponse,
	FormattedLocation,
	LocationListResponse,
	SpecialResponse,
	SpecialListResponse,
	NewSpecial,
	locationQueryParamsSchema,
	newSpecialResposneSchema,
} from 'types/schemas';

export interface Poi {
	key: string;
	location: google.maps.LatLngLiteral;
}

export interface LocationsQueryParams {
	day?: string;
}
