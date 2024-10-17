import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '@mui/material';

import AddLocationModal from './components/AddSpecialModal/add-special-modal';
import GlobalWrapper from './components/global-wrapper';
import './assets/styles/index.css';
import QueryClientProvider from './providers/QueryClientProviders';

function App() {
	const [open, setOpen] = useState<boolean>(false);

	// const { data: testData, status } = useQuery({
	// 	queryKey: ['ping'],
	// 	queryFn: () => getTest().then(({ data }) => data),
	// });

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
				<AddLocationModal open={open} setOpen={setOpen} />
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
