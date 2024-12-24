import { z } from 'zod';

export const registerNewUser = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	password: z.string(),
});

export const registerNewUserResponse = z.object({
	detail: z.string(),
});

export const loginUser = z.object({
	username: z.string(),
	password: z.string(),
});

export const loginUserResponse = z.object({
	access: z.string(),
	refresh: z.string(),
});
