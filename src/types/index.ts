import { type newSpecialRequest } from 'types/special';

export type { PingResponse } from 'types/ping';
export type {
	FormattedLocation,
	LocationListResponse,
	LocationsQueryParams,
} from 'types/location';
export type {
	newSpecialRequest,
	newSpecialResponse,
	groupedSpecialResponse,
} from 'types/special';

export interface NewSpecialSelectProps {
	value: string;
	display: string;
}

export interface NewSpecialTextFormFieldProps {
	name: keyof newSpecialRequest;
	label: string;
	requiredField: boolean;
	componentProps?: object;
}

export interface NewSpecialSelectFormFieldProps {
	name: keyof newSpecialRequest;
	label: string;
	requiredField: boolean;
	dataset: NewSpecialSelectProps[];
}
