/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import AddLocationModal from '../AddSpecialModal/add-special-modal';
import NewLocationProvider from '../../providers/new-location-provider';
import ExistingLocationGoogleMap from '../GoogleMap/viewer-map';
import SplitView from './split-view';

export default function MainBody() {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Box id="body">
			<SplitView
				left={
					<Button
						onClick={() => setOpen(!open)}
						className="h-12 w-36 border-2"
						variant="contained"
					>
						Test me out
					</Button>
				}
				right={<ExistingLocationGoogleMap />}
				className="min-h-[80vh]"
			/>
			<NewLocationProvider>
				<AddLocationModal open={open} setOpen={setOpen} />
			</NewLocationProvider>
		</Box>
	);
}
