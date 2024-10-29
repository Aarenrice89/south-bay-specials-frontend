/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '@mui/material';

import AddLocationModal from './components/AddSpecialModal/add-special-modal';
import GlobalWrapper from './components/global-wrapper';
import './assets/styles/index.css';
import './assets/styles/output.css';
import QueryClientProvider from './providers/query-client-provider';
import NewLocationProvider from './providers/new-location-provider';
import ExistingLocationGoogleMap from './components/GoogleMap/viewer-map';

function App() {
	const [open, setOpen] = useState<boolean>(false);

	// TODO: move the newlocationprovider inside the addlocationmodal

	return (
		<div className="flex h-screen flex-col">
			<div className="flex flex-auto justify-center items-center">
				<Button
					onClick={() => setOpen(!open)}
					className="h-12 w-36 border-2"
					variant="contained"
				>
					Test me out
				</Button>
				<NewLocationProvider>
					<AddLocationModal open={open} setOpen={setOpen} />
				</NewLocationProvider>
				<ExistingLocationGoogleMap />
			</div>
		</div>
	);
}

export default App;

export function renderToDom(container: HTMLElement) {
	const root = createRoot(container);

	root.render(
		<React.StrictMode>
			<GlobalWrapper>
				<QueryClientProvider>
					<App />
				</QueryClientProvider>
			</GlobalWrapper>
		</React.StrictMode>,
	);
}
