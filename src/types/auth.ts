import { type z } from 'zod';
import type {
	registerNewUser,
	loginUser,
	registerNewUserResponse,
	loginUserResponse,
	refreshToken,
} from 'schemas';

export interface RegisterNewUser extends z.infer<typeof registerNewUser> {}
export interface LoginUser extends z.infer<typeof loginUser> {}
export interface RegisterNewUserResponse
	extends z.infer<typeof registerNewUserResponse> {}
export interface LoginUserResponse extends z.infer<typeof loginUserResponse> {}
export interface RefreshToken extends z.infer<typeof refreshToken> {}
