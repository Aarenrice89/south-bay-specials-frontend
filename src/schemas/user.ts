import { z } from 'zod';

const userSchema = z.object({
	email: z.string().email(),
	firstName: z.string(),
	lastName: z.string(),
});

// eslint-disable-next-line import/prefer-default-export
export { userSchema };
