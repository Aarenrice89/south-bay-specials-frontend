/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { lazy, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Router from 'navigation/router';
import { paths } from 'enums';
import HomePage from 'pages/home-page';

import MainBody from 'components/layout/body';
import GlobalWrapper from './components/global-wrapper';
import './assets/styles/index.css';
// import './assets/styles/output.css';
import QueryClientProvider from './providers/query-client-provider';
import AuthProvider from './providers/auth';

// const HomePage = lazy(() => import('pages/home-page'));

function App() {
	return <MainBody />;
}

export default App;

export function renderToDom(container: HTMLElement) {
	const root = createRoot(container);
	root.render(
		<React.StrictMode>
			<QueryClientProvider>
				<AuthProvider>
					<Router>
						<GlobalWrapper>
							<Outlet />
						</GlobalWrapper>
					</Router>
				</AuthProvider>
			</QueryClientProvider>
		</React.StrictMode>,
	);
}
