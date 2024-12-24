import React from 'react';
import { Box } from '@mui/material';
import ListSpecials from 'components/ListSpecials/list-specials';
import SplitPanelProvider from 'providers/split-panel-provider';
import ExistingLocationGoogleMap from '../GoogleMap/viewer-map';
import SplitView from './split-view';

export default function MainBody() {
	return (
		<Box>
			<SplitPanelProvider>
				<SplitView
					left={<ListSpecials />}
					right={<ExistingLocationGoogleMap />}
				/>
			</SplitPanelProvider>
		</Box>
	);
}
