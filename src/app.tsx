/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import MainBody from 'components/layout/body';
import GlobalWrapper from './components/global-wrapper';
import './assets/styles/index.css';
// import './assets/styles/output.css';
import QueryClientProvider from './providers/query-client-provider';

function App() {
	return <MainBody />;
}

export default App;

export function renderToDom(container: HTMLElement) {
	const root = createRoot(container);

	root.render(
		<React.StrictMode>
			<QueryClientProvider>
				<GlobalWrapper>
					<App />
				</GlobalWrapper>
			</QueryClientProvider>
		</React.StrictMode>,
	);
}
