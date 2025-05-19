import { Controller, useFormContext } from 'react-hook-form';
import {
	Select,
	MenuItem,
	FormControl,
	FormLabel,
	FormHelperText,
} from '@mui/material';

import type { NewSpecialRequest, NewSpecialSelectFormFieldProps } from 'types';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 224,
		},
	},
};

export default function SelectFormField({
	name,
	label,
	requiredField,
	dataset,
}: NewSpecialSelectFormFieldProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext<NewSpecialRequest>();

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={null}
			rules={requiredField ? { required: `${label} is required` } : {}}
			render={({ field }) => (
				<FormControl fullWidth>
					<FormLabel error={!!errors[name]}>{label}</FormLabel>
					<Select
						onChange={field.onChange}
						value={field.value || ''}
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
