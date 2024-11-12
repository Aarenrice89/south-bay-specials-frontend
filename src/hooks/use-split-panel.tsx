import { useContext } from 'react';

import { SplitPanelContext } from 'providers/split-panel-provider';

export default function useSplitPanelContext() {
	return useContext(SplitPanelContext);
}
