import { type z } from 'zod';
import type {
	newSpecialRequestSchema,
	newSpecialResponseSchema,
} from 'schemas';

export interface newSpecialRequest
	extends z.infer<typeof newSpecialRequestSchema> {}
export interface newSpecialResponse
	extends z.infer<typeof newSpecialResponseSchema> {}
