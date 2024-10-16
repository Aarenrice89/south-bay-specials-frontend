import React from 'react';
import {
	Grid,
	TextField,
	Select,
	MenuItem,
	FormControl,
	FormLabel,
	FormHelperText,
} from '@mui/material';

import { Controller, useFormContext } from 'react-hook-form';
import _ from 'lodash';

interface SelectProps {
	value: string;
	display: string;
}

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 224,
		},
	},
};

interface FormValues {
	name: string;
	description: string;
	limitations: string;
	dayOfWeek: string;
	startTime: string;
	endTime: string;
}

interface TextFormFieldProps {
	name: keyof FormValues;
	label: string;
	requiredField: boolean;
	componentProps?: object;
}

interface SelectFormFieldProps {
	name: keyof FormValues;
	label: string;
	requiredField: boolean;
	dataset: SelectProps[];
}

function TextFormField({
	name,
	label,
	requiredField,
	componentProps,
}: TextFormFieldProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext<FormValues>();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue=""
			rules={requiredField ? { required: `${label} is required` } : {}}
			render={({ field }) => (
				<FormControl fullWidth>
					<FormLabel error={!!errors[name]}>{label}</FormLabel>
					<TextField
						id={name}
						className="mt-1"
						onChange={field.onChange}
						value={field.value}
						inputRef={field.ref}
						error={!!errors[name]}
						autoComplete="off"
						{...componentProps}
					/>
					<div style={{ minHeight: '1.5em' }}>
						{errors[name] ? (
							<FormHelperText error>
								{errors[name]?.message}
							</FormHelperText>
						) : (
							<FormHelperText>&nbsp;</FormHelperText>
						)}
					</div>
				</FormControl>
			)}
		/>
	);
}

function SelectFormField({
	name,
	label,
	requiredField,
	dataset,
}: SelectFormFieldProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext<FormValues>();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue=""
			rules={requiredField ? { required: `${label} is required` } : {}}
			render={({ field }) => (
				<FormControl fullWidth>
					<FormLabel error={!!errors[name]}>{label}</FormLabel>
					<Select
						onChange={field.onChange}
						value={field.value}
						inputRef={field.ref}
						error={!!errors[name]}
						name={name}
						MenuProps={MenuProps}
						fullWidth
					>
						{dataset.map((item) => (
							<MenuItem
								id={item.value}
								key={item.value}
								value={item.value}
							>
								{item.display}
							</MenuItem>
						))}
					</Select>
					<div className="min-h-[1.5em]">
						{errors[name] ? (
							<FormHelperText error>
								{errors[name]?.message}
							</FormHelperText>
						) : (
							<FormHelperText>&nbsp;</FormHelperText>
						)}
					</div>
				</FormControl>
			)}
		/>
	);
}

const getDayNames = (): SelectProps[] => {
	const days = _.range(0, 7).map((day: number) => {
		const date = new Date();
		date.setDate(date.getDate() - date.getDay() + day);
		const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
		return { value: dayName, display: dayName };
	});
	return days;
};

const formatTime = (hour: number, minute: number): string => {
	const period = hour < 12 ? 'AM' : 'PM';
	const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
	const formattedMinute = minute.toString().padStart(2, '0');
	return `${formattedHour}:${formattedMinute} ${period}`;
};

const getTimeValueSelect = (): SelectProps[] => {
	return _.flatMap(_.range(0, 24), (hour: number) => {
		return _.range(0, 60, 60).map((minute: number) => {
			const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
			const displayString = formatTime(hour, minute);
			return { value: timeString, display: displayString };
		});
	});
};

function SpecialDetailsForm() {
	return (
		<div className="pt-2 px-2 flex-grow rounded-r-md overflow-hidden">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextFormField
						name="name"
						label="Special Name"
						requiredField
					/>
				</Grid>
				<Grid item xs={12}>
					<TextFormField
						name="description"
						label="Description"
						requiredField
						componentProps={{ multiline: true, rows: 3 }}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextFormField
						name="limitations"
						label="Limitations"
						requiredField={false}
					/>
				</Grid>
				<Grid item xs={12}>
					<SelectFormField
						name="dayOfWeek"
						label="Day"
						requiredField
						dataset={getDayNames()}
					/>
				</Grid>
				<Grid item xs={6}>
					<SelectFormField
						name="startTime"
						label="Start Time"
						requiredField={false}
						dataset={getTimeValueSelect()}
					/>
				</Grid>
				<Grid item xs={6}>
					<SelectFormField
						name="endTime"
						label="End Time"
						requiredField={false}
						dataset={getTimeValueSelect()}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

// Provide default props
TextFormField.defaultProps = {
	componentProps: {},
};

export default SpecialDetailsForm;
