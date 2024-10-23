import { z } from 'zod';

export const locationSchema = z.object({
	name: z.string().nullable(),
	address: z.string().nullable(),
	latitude: z.number().nullable(),
	longitude: z.number().nullable(),
	phoneNumber: z.string().nullable(),
	website: z.string().nullable(),
	googlePlaceId: z.string().nullable(),
});

export const locationListSchema = z.array(locationSchema);

export interface FormattedLocation extends z.infer<typeof locationSchema> {}
export interface LocationListResponse
	extends z.infer<typeof locationListSchema> {}
