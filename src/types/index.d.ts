export type {
	PingResponse,
	LocationResponse,
	LocationListResponse,
	SpecialResponse,
	SpecialListResponse,
} from 'types/schemas';

export interface Poi {
	key: string;
	location: google.maps.LatLngLiteral;
}
