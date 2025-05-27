import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Container, CircularProgress } from '@mui/material';
import { paths } from 'enums';
import ErrorBoundary from './error-boundary';

const HomePage = lazy(() => import('pages/home-page'));
const LoginPage = lazy(() => import('pages/login-page'));
const PageError = lazy(() => import('pages/error-page'));
const SignUpPage = lazy(() => import('pages/sign-up-page'));

function LoadingFallback() {
	return (
		<Container className="size-full flex justify-center items-center">
			<CircularProgress />
		</Container>
	);
}

export default function Router({ children }: { children: React.ReactNode }) {
	const router = createBrowserRouter([
		{
			path: paths.root,
			element: (
				<Suspense fallback={<LoadingFallback />}>{children}</Suspense>
			),
			errorElement: <ErrorBoundary />,
			children: [
				{
					index: true,
					element: (
						<Suspense fallback={<LoadingFallback />}>
							<HomePage />
						</Suspense>
					),
				},
				{
					path: paths.login,
					element: (
						<Suspense fallback={<LoadingFallback />}>
							<LoginPage />
						</Suspense>
					),
				},
				{
					path: paths.signUp,
					element: (
						<Suspense fallback={<LoadingFallback />}>
							<SignUpPage />
						</Suspense>
					),
				},
			],
		},
		{
			path: paths.error,
			element: (
				<Suspense fallback={<LoadingFallback />}>
					<PageError />
				</Suspense>
			),
		},
	]);

	return <RouterProvider router={router} />;
}
