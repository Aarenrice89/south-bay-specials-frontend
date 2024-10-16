import React, { type ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import HeaderBar from './layout/header';

function GlobalWrapper({ children }: { children: ReactNode }) {
	return (
		<Box className="bg-white h-full min-h-screen flex flex-col">
			<HeaderBar />
			<Container
				maxWidth={false}
				className="px-0 grow flex flex-col"
				role="main"
			>
				{children}
			</Container>
		</Box>
	);
}

export default GlobalWrapper;
