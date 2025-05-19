import { Controller, useFormContext } from 'react-hook-form';
import {
	TextField,
	FormControl,
	FormLabel,
	FormHelperText,
} from '@mui/material';

import type { NewSpecialRequest, NewSpecialTextFormFieldProps } from 'types';

export default function TextFormField({
	name,
	label,
	requiredField,
	componentProps = {},
}: NewSpecialTextFormFieldProps) {
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
					<TextField
						id={name}
						className="mt-1"
						onChange={field.onChange}
						value={field.value || ''}
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
