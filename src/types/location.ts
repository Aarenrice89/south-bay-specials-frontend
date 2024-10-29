import { type z } from 'zod';
import type {
	locationSchema,
	locationListSchema,
	locationQueryParamsSchema,
} from 'schemas';

export interface FormattedLocation extends z.infer<typeof locationSchema> {}
export interface LocationListResponse
	extends z.infer<typeof locationListSchema> {}
export interface LocationsQueryParams
	extends z.infer<typeof locationQueryParamsSchema> {}
