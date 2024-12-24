/* eslint-disable no-console */
import React from 'react';
import {
	Box,
	Button,
	TextField,
	Typography,
	Link,
	Grid,
	FormControl,
	FormLabel,
	FormHelperText,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { paths } from 'enums';
import { type LoginUser } from 'types';
import useAuthContext from 'hooks/use-auth';

export default function LoginPage() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginUser>();

	const { login } = useAuthContext();

	const onSubmit = (data: LoginUser) => {
		login(data);
	};

	return (
		<Box className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
			<Box className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
				<Typography variant="h4" className="mb-4 text-center">
					Login
				</Typography>
				<Grid container columnSpacing={1} rowSpacing={0}>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<FormLabel error={!!errors.username}>
								Email
							</FormLabel>
							<Controller
								name="username"
								control={control}
								defaultValue=""
								rules={{
									required: 'Email is required',
								}}
								render={({ field }) => (
									<TextField
										id="username"
										className="mt-1"
										onChange={field.onChange}
										value={field.value}
										inputRef={field.ref}
										error={!!errors.username}
										autoComplete="off"
										type="email"
									/>
								)}
							/>
							<div style={{ minHeight: '1em' }}>
								{errors.username ? (
									<FormHelperText error>
										{errors.username?.message}
									</FormHelperText>
								) : (
									<FormHelperText>&nbsp;</FormHelperText>
								)}
							</div>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<FormLabel error={!!errors.password}>
								Password
							</FormLabel>
							<Controller
								name="password"
								control={control}
								defaultValue=""
								rules={{
									required: 'Password is required',
								}}
								render={({ field }) => (
									<TextField
										id="password"
										className="mt-1"
										onChange={field.onChange}
										value={field.value}
										inputRef={field.ref}
										error={!!errors.password}
										autoComplete="off"
										type="password"
									/>
								)}
							/>
							<div style={{ minHeight: '1em' }}>
								{errors.password ? (
									<FormHelperText error>
										{errors.password?.message}
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
							Sign In
						</Button>
					</Grid>
				</Grid>
				<Typography variant="body2" className="text-center pt-2">
					Don&apos;t have an account?{' '}
					<Link component={RouterLink} to={paths.signUp}>
						Create an account
					</Link>
				</Typography>
			</Box>
		</Box>
	);
}
