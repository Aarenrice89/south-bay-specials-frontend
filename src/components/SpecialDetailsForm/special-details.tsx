import {
	Grid,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	FormHelperText,
	SelectChangeEvent,
	Button,
} from '@mui/material';
import { FormEvent, useState, type ChangeEvent } from 'react';
// import { RequestState } from '../../enums';

interface SelectProps {
	value: string;
	display: string;
}

const timeValueSelect: SelectProps[] = [
	{ value: '00:00', display: '12:00 AM' },
	{ value: '01:00', display: '01:00 AM' },
	{ value: '02:00', display: '02:00 AM' },
	{ value: '03:00', display: '03:00 AM' },
	{ value: '04:00', display: '04:00 AM' },
	{ value: '05:00', display: '05:00 AM' },
	{ value: '06:00', display: '06:00 AM' },
	{ value: '07:00', display: '07:00 AM' },
	{ value: '08:00', display: '08:00 AM' },
	{ value: '09:00', display: '09:00 AM' },
	{ value: '10:00', display: '10:00 AM' },
	{ value: '11:00', display: '11:00 AM' },
	{ value: '12:00', display: '12:00 PM' },
	{ value: '13:00', display: '01:00 PM' },
	{ value: '14:00', display: '02:00 PM' },
	{ value: '15:00', display: '03:00 PM' },
	{ value: '16:00', display: '04:00 PM' },
	{ value: '17:00', display: '05:00 PM' },
	{ value: '18:00', display: '06:00 PM' },
	{ value: '19:00', display: '07:00 PM' },
	{ value: '20:00', display: '08:00 PM' },
	{ value: '21:00', display: '09:00 PM' },
	{ value: '22:00', display: '10:00 PM' },
	{ value: '23:00', display: '11:00 PM' },
];

const DayOfWeek: SelectProps[] = [
	{ value: 'Monday', display: 'Monday' },
	{ value: 'Tuesday', display: 'Tuesday' },
	{ value: 'Wednesday', display: 'Wednesday' },
	{ value: 'Thursday', display: 'Thursday' },
	{ value: 'Friday', display: 'Friday' },
	{ value: 'Saturday', display: 'Saturday' },
	{ value: 'Sunday', display: 'Sunday' },
];

type timeValues =
	| '00:00'
	| '01:00'
	| '02:00'
	| '03:00'
	| '04:00'
	| '05:00'
	| '06:00'
	| '07:00'
	| '08:00'
	| '09:00'
	| '10:00'
	| '11:00'
	| '12:00'
	| '13:00'
	| '14:00'
	| '15:00'
	| '16:00'
	| '17:00'
	| '18:00'
	| '19:00'
	| '20:00'
	| '21:00'
	| '22:00'
	| '23:00';

interface FormValueProps {
	name: string;
	description: string;
	limitations: string | null;
	dayOfWeek:
		| 'Monday'
		| 'Tuesday'
		| 'Wednesday'
		| 'Thursday'
		| 'Friday'
		| 'Saturday'
		| 'Sunday';
	startTime: timeValues;
	endTime: timeValues;
}

const defaultFormValues: FormValueProps = {
	name: '',
	description: '',
	limitations: null,
	dayOfWeek: 'Monday',
	startTime: '00:00',
	endTime: '00:00',
};

interface InputTypes {
	id: number;
	name:
		| 'name'
		| 'description'
		| 'limitations'
		| 'dayOfWeek'
		| 'startTime'
		| 'endTime';
	label: string;
	required: boolean;
	component: 'text' | 'select';
	dataset?: typeof timeValueSelect | typeof DayOfWeek;
	gridsizeProps: object;
	componentProps?: object;
}

interface FormErrorValueProps {
	name: boolean;
	description: boolean;
	limitations: boolean;
	dayOfWeek: boolean;
	startTime: boolean;
	endTime: boolean;
}

const defaultFormErrorValues: FormErrorValueProps = {
	name: true,
	description: true,
	limitations: false,
	dayOfWeek: true,
	startTime: true,
	endTime: true,
};

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 224,
		},
	},
};

export default function SpecialDetailsForm() {
	const [values, setValues] = useState<FormValueProps>(defaultFormValues);
	const [showErrors, setShowErrors] = useState<boolean>(true);
	const [showErrorValues, setShowErrorValues] = useState<FormErrorValueProps>(
		defaultFormErrorValues,
	);
	// const [submitReqState, setSubmitReqState] = useState<RequestState>(
	// 	RequestState.NotInitiated,
	// );

	const handleChange =
		(name: string) => (event: ChangeEvent<HTMLInputElement>) => {
			if (event.target.value === '' || event.target.value === null) {
				setShowErrorValues({ ...showErrorValues, [name]: true });
			} else {
				setShowErrorValues({ ...showErrorValues, [name]: false });
			}
			return setValues({ ...values, [name]: event.target.value });
		};

	const handleSelectChange =
		(name: string) => (event: SelectChangeEvent<string>) => {
			if (event.target.value !== null) {
				setShowErrorValues({ ...showErrorValues, [name]: false });
			}
			return setValues({ ...values, [name]: event.target.value });
		};

	const hasErrors = (): boolean => {
		return false;
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// if (hasErrors()) {
		// 	return setSubmitReqState(RequestState.Error);
		// }
	};

	const inputs: InputTypes[] = [
		{
			id: 0,
			name: 'name',
			label: 'Name',
			required: true,
			component: 'text',
			gridsizeProps: { xs: 12 },
		},
		{
			id: 1,
			name: 'description',
			label: 'Description',
			required: true,
			component: 'text',
			gridsizeProps: { xs: 12 },
			componentProps: { multiline: true, rows: 3 },
		},
		{
			id: 2,
			name: 'limitations',
			label: 'Limitations',
			required: false,
			component: 'text',
			gridsizeProps: { xs: 12 },
		},
		{
			id: 3,
			name: 'dayOfWeek',
			label: 'Day',
			required: true,
			component: 'select',
			dataset: DayOfWeek,
			gridsizeProps: { xs: 12 },
		},
		{
			id: 4,
			name: 'startTime',
			label: 'Start time',
			required: true,
			component: 'select',
			dataset: timeValueSelect,
			gridsizeProps: { xs: 6 },
		},
		{
			id: 5,
			name: 'endTime',
			label: 'End time',
			required: true,
			component: 'select',
			dataset: timeValueSelect,
			gridsizeProps: { xs: 6 },
		},
	];

	console.log('Values', values);

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className=" pt-2 px-2 flex-grow rounded-r-md overflow-hidden"
			>
				<Grid container spacing={6}>
					{inputs.map((input) => (
						<Grid
							item
							{...input.gridsizeProps}
							key={`${input.name}-input`}
						>
							{input.component === 'text' ? (
								<>
									<InputLabel
										shrink={false}
										error={
											showErrors &&
											showErrorValues[input.name]
										}
									>
										{input.label}
									</InputLabel>
									<TextField
										name={input.name}
										fullWidth
										onChange={handleChange(input.name)}
										{...input?.componentProps}
										autoComplete="off"
										error={
											showErrors &&
											showErrorValues[input.name]
										}
										helperText={
											showErrors &&
											showErrorValues[input.name]
												? `Must provide ${input.name}`
												: ''
										}
									/>
								</>
							) : (
								<FormControl
									fullWidth
									error={
										showErrors &&
										showErrorValues[input.name]
									}
								>
									<InputLabel>{input.label}</InputLabel>
									<Select
										label={input.label}
										onChange={handleSelectChange(
											input.name,
										)}
										name={input.name}
										MenuProps={MenuProps}
										fullWidth
									>
										{input.dataset?.map((item) => (
											<MenuItem value={item.value}>
												{item.display}
											</MenuItem>
										))}
									</Select>
									{showErrors &&
									showErrorValues[input.name] ? (
										<FormHelperText>
											Must select one
										</FormHelperText>
									) : (
										<></>
									)}
								</FormControl>
							)}
						</Grid>
					))}
				</Grid>
			</form>
			{/* <Button onClick={handleSubmit}>Hit me</Button> */}
		</>
	);
}
