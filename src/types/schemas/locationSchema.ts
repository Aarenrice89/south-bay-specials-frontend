import { z } from 'zod';

export const locationSchema = z.object({
	id: z.number(),
	name: z.string(),
	address: z.string(),
	city: z.string(),
	state: z.string(),
	country: z.string(),
	zipcode: z.string(),
	googleLink: z.string(),
});

export const locationListSchema = z.array(locationSchema);

export interface LocationResponse extends z.infer<typeof locationSchema> {}
export interface LocationListResponse
	extends z.infer<typeof locationListSchema> {}
