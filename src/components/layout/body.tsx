import React from 'react';
import { Box } from '@mui/material';
import ListSpecials from 'components/ListSpecials/list-specials';
import SplitPanelProvider from 'providers/split-panel-provider';
import ExistingLocationGoogleMap from '../GoogleMap/viewer-map';
import SplitView from './split-view';
import HeaderBar from './header';

export default function MainBody() {
	return (
		<Box>
			<SplitPanelProvider>
				<div className="fixed top-0 left-0 w-full z-50">
					<HeaderBar />
				</div>
				<SplitView
					left={<ListSpecials />}
					right={<ExistingLocationGoogleMap />}
					classNameLeft="pt-[80px]"
					classNameDivider="pt-[80px]"
				/>
			</SplitPanelProvider>
		</Box>
	);
}
