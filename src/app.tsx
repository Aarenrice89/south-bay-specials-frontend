import React from 'react';
import { createRoot } from 'react-dom/client';
import { Outlet } from 'react-router-dom';
import Router from 'navigation/router';

import MainBody from 'components/layout/body';
import GlobalWrapper from './components/global-wrapper';
import './assets/styles/index.css';
// import './assets/styles/output.css';
import QueryClientProvider from './providers/query-client-provider';
import AuthProvider from './providers/auth';

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
