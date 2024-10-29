import { useContext } from 'react';

import { NewLocationContext } from 'src/providers/new-location-provider';

export default function useNewLocationContext() {
	return useContext(NewLocationContext);
}
