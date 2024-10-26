import React from 'react';
import { type ControlPosition, MapControl } from '@vis.gl/react-google-maps';
import AutocompleteCustom from './autocomplete-custom';

type CustomAutocompleteControlProps = {
	controlPosition: ControlPosition;
};

function CustomMapControl({ controlPosition }: CustomAutocompleteControlProps) {
	return (
		<MapControl position={controlPosition}>
			<AutocompleteCustom />
		</MapControl>
	);
}

export default CustomMapControl;
