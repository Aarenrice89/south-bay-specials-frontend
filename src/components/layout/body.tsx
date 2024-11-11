/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import ListSpecials from 'components/ListSpecials/list-specials';
import NewLocationProvider from 'providers/new-location-provider';
import SplitPanelProvider from 'providers/split-panel-provider';
import AddLocationModal from '../AddSpecialModal/add-special-modal';
import ExistingLocationGoogleMap from '../GoogleMap/viewer-map';
import SplitView from './split-view';

export default function MainBody() {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Box>
			<SplitPanelProvider>
				<SplitView
					left={<ListSpecials />}
					right={<ExistingLocationGoogleMap />}
				/>
			</SplitPanelProvider>
			{/* <Button
				onClick={() => setOpen(!open)}
				className="h-12 w-36 border-2"
				variant="contained"
			>
				Test me out
			</Button>
			<NewLocationProvider>
				<AddLocationModal open={open} setOpen={setOpen} />
			</NewLocationProvider> */}
		</Box>
	);
}
