import { useContext } from 'react';

import { NewLocationContext } from 'stores/new-location-context';

export default function useNewLocationContext() {
	return useContext(NewLocationContext);
}
