import { z } from 'zod';

export const locationSchema = z.object({
	name: z.string().nullable(),
	address: z.string().nullable(),
	latitude: z.number(),
	longitude: z.number(),
	phoneNumber: z.string().nullable(),
	website: z.string().nullable(),
	googlePlaceId: z.string(),
	googleUrl: z.string(),
});

export const locationListSchema = z.array(locationSchema);

export const locationQueryParamsSchema = z.object({
	day: z.string().optional(),
});
