import { type z } from 'zod';
import type {
	newSpecialRequestSchema,
	newSpecialResponseSchema,
	groupedSpecialResponseSchema,
} from 'schemas';

export interface NewSpecialRequest
	extends z.infer<typeof newSpecialRequestSchema> {}
export interface NewSpecialResponse
	extends z.infer<typeof newSpecialResponseSchema> {}
export interface GroupedSpecialResponse
	extends z.infer<typeof groupedSpecialResponseSchema> {}
