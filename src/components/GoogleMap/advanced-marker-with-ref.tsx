import React from 'react';
import {
	AdvancedMarker,
	type AdvancedMarkerProps,
	useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

function AdvancedMarkerWithRef(
	props: AdvancedMarkerProps & {
		onMarkerClick: (
			marker: google.maps.marker.AdvancedMarkerElement,
		) => void;
	},
) {
	const { children, onMarkerClick, ...advancedMarkerProps } = props;
	const [markerRef, marker] = useAdvancedMarkerRef();

	return (
		<AdvancedMarker
			onClick={() => {
				if (marker) {
					onMarkerClick(marker);
				}
			}}
			ref={markerRef}
			{...advancedMarkerProps}
		>
			{children}
		</AdvancedMarker>
	);
}

export default AdvancedMarkerWithRef;
