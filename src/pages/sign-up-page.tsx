import React from 'react';
import {
	Box,
	Button,
	Grid,
	TextField,
	Typography,
	FormControl,
	FormLabel,
	FormHelperText,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postRegisterNewUser } from 'src/services/api/methods';
import { paths } from 'enums';
import type { RegisterNewUser } from 'types';

interface FormComponent {
	name: keyof RegisterNewUser;
	label: string;
	gridProps: { xs: number };
	className?: string;
}

const formComponents: FormComponent[] = [
	{
		name: 'firstName',
		label: 'First Name',
		gridProps: { xs: 6 },
	},
	{
		name: 'lastName',
		label: 'Last Name',
		gridProps: { xs: 6 },
	},
	{
		name: 'email',
		label: 'Email',
		gridProps: { xs: 12 },
	},
	{
		name: 'password',
		label: 'Password',
		gridProps: { xs: 12 },
	},
];

export default function SignUpPage() {
	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<RegisterNewUser & { confirmPassword: string }>();

	const navigate = useNavigate();

	const onSubmit = (data: RegisterNewUser) => {
		postRegisterNewUser(data)
			.then(() => {
				navigate(paths.login);
			})
			.catch((error) => console.error('User registration failed', error));
	};

	return (
		<Box className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
			<Box className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
				<Typography variant="h4" className="pb-4 text-center">
					Register
				</Typography>
				<Grid container columnSpacing={1} rowSpacing={0}>
					{formComponents.map(({ name, label, gridProps }) => (
						<Grid item {...gridProps}>
							<FormControl fullWidth>
								<FormLabel error={!!errors[name]}>
									{label}
								</FormLabel>
								<Controller
									name={name}
									control={control}
									defaultValue=""
									rules={{
										required: `${label} is required`,
									}}
									render={({ field }) => (
										<TextField
											id={name}
											className="mt-1"
											onChange={field.onChange}
											value={field.value}
											error={!!errors[name]}
											inputRef={field.ref}
											type={
												name.includes('password')
													? 'password'
													: 'text'
											}
											autoComplete="off"
										/>
									)}
								/>
								<div style={{ minHeight: '1em' }}>
									{errors[name] ? (
										<FormHelperText error>
											{errors[name]?.message}
										</FormHelperText>
									) : (
										<FormHelperText>&nbsp;</FormHelperText>
									)}
								</div>
							</FormControl>
						</Grid>
					))}
					<Grid item xs={12}>
						<FormControl fullWidth>
							<FormLabel>Confirm Password</FormLabel>
							<Controller
								name="confirmPassword"
								control={control}
								defaultValue=""
								rules={{
									required: 'Confirm Password is required',
									validate: (value) =>
										value === getValues('password') ||
										'Passwords do not match',
								}}
								render={({ field }) => (
									<TextField
										id="confirmPassword"
										className="mt-1"
										onChange={field.onChange}
										value={field.value}
										error={!!errors.confirmPassword}
										inputRef={field.ref}
										type="password"
										autoComplete="off"
									/>
								)}
							/>
							<div style={{ minHeight: '1em' }}>
								{errors.confirmPassword ? (
									<FormHelperText error>
										{errors.confirmPassword?.message}
									</FormHelperText>
								) : (
									<FormHelperText>&nbsp;</FormHelperText>
								)}
							</div>
						</FormControl>
					</Grid>
					<Grid item xs={12} className="pt-2">
						<Button
							variant="contained"
							color="primary"
							fullWidth
							className="mb-4"
							onClick={handleSubmit(onSubmit)}
						>
							Sign Up
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
