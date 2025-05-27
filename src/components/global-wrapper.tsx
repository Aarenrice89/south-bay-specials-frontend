import React, { type ReactNode } from 'react';
import { Box, Container } from '@mui/material';

function GlobalWrapper({ children }: { children: ReactNode }) {
	return (
		<Box className="bg-white h-full min-h-screen flex flex-col">
			<Container
				maxWidth={false}
				className="p-0 grow flex flex-col bg-gray-50"
				role="main"
				disableGutters
			>
				{children}
			</Container>
		</Box>
	);
}

export default GlobalWrapper;
