import { type NewSpecialRequest } from 'types/special';

export type { PingResponse } from 'types/ping';
export type {
	FormattedLocation,
	LocationListResponse,
	LocationsQueryParams,
} from 'types/location';
export type {
	NewSpecialRequest,
	NewSpecialResponse,
	GroupedSpecialResponse,
} from 'types/special';
export type {
	RegisterNewUser,
	LoginUser,
	RegisterNewUserResponse,
	LoginUserResponse,
	RefreshToken,
} from 'types/auth';
export type { User } from 'types/user';

export interface NewSpecialSelectProps {
	value: string;
	display: string;
}

export interface NewSpecialTextFormFieldProps {
	name: keyof NewSpecialRequest;
	label: string;
	requiredField: boolean;
	componentProps?: object;
}

export interface NewSpecialSelectFormFieldProps {
	name: keyof NewSpecialRequest;
	label: string;
	requiredField: boolean;
	dataset: NewSpecialSelectProps[];
}
