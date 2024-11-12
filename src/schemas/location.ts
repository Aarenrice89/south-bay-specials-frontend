import { z } from 'zod';

export const locationBaseSchema = z.object({
	name: z.string().nullable(),
	address: z.string().nullable(),
	phoneNumber: z.string().nullable(),
	website: z.string().nullable(),
	googlePlaceId: z.string(),
	googleUrl: z.string(),
});

export const locationSchema = locationBaseSchema.extend({
	latitude: z.number(),
	longitude: z.number(),
});

export const locationListSchema = z.array(locationSchema);

export const locationQueryParamsSchema = z.object({
	day: z.string().optional(),
});
