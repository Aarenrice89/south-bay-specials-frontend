export type {
	PingResponse,
	FormattedLocation,
	LocationListResponse,
	SpecialResponse,
	SpecialListResponse,
	NewSpecial,
} from 'types/schemas';

export interface Poi {
	key: string;
	location: google.maps.LatLngLiteral;
}
