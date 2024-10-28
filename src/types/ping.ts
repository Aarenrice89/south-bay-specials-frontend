import { type z } from 'zod';
import { type pingSchema } from 'schemas';

export interface PingResponse extends z.infer<typeof pingSchema> {}
