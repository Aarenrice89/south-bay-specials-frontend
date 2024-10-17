import { z } from 'zod';

export const pingSchema = z.object({
	data: z.string(),
});

export interface PingResponse extends z.infer<typeof pingSchema> {}
