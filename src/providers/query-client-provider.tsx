import { type ReactNode } from 'react';
import {
	QueryClientProvider as ReactQueryClientProvider,
	QueryClient,
	type QueryClientConfig,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { includes } from 'lodash';
import { type AxiosError } from 'axios';

interface MyMeta extends Record<string, unknown> {
	errorMessage?: string;
	successMessage?: string;
}

declare module '@tanstack/react-query' {
	interface Register {
		defaultError: AxiosError;
		queryMeta: MyMeta;
		mutationMeta: MyMeta;
	}
}

const MAX_RETRIES = 3;

export const clientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			retryDelay: (attemptIndex: number) =>
				Math.min(1000 * 2 ** attemptIndex, 30000),
			retry: (failureCount: number, error: AxiosError) => {
				if (includes([404, 500], error.response?.status)) {
					return false;
				}
				return failureCount < MAX_RETRIES;
			},
		},
	},
};

const queryClient = new QueryClient();

function QueryClientProvider({
	children,
	overrideQueryClient = undefined,
}: {
	children: ReactNode;
	overrideQueryClient?: QueryClient;
}) {
	return (
		<ReactQueryClientProvider client={overrideQueryClient || queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</ReactQueryClientProvider>
	);
}

export default QueryClientProvider;
