import { type z } from 'zod';
import type { userSchema } from 'schemas';

export interface User extends z.infer<typeof userSchema> {}
