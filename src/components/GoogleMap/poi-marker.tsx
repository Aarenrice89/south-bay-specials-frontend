import React, { useEffect, useState, useRef, useCallback } from 'react';

import {
	useMap,
	AdvancedMarker,
	InfoWindow,
	useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

import { MarkerClusterer } from '@googlemaps/markerclusterer';
// import type { Marker } from '@googlemaps/markerclusterer';

// import { Circle } from "./circle";
import { type Poi } from '../../types';

function PoiMarkers({ pois }: { pois: Poi[] }) {
	const map = useMap();
	// const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
	const clusterer = useRef<MarkerClusterer | null>(null);
	const [infowindowOpen, setInfowindowOpen] = useState<boolean>(true);
	const [markerRef, marker] = useAdvancedMarkerRef();

	const handleClick = useCallback(
		(ev: google.maps.MapMouseEvent) => {
			if (!map) return;
			if (!ev.latLng) return;
			console.log('marker clicked: ', ev.latLng.toString());
			map.panTo(ev.latLng);
			// setCircleCenter(ev.latLng);
			setInfowindowOpen(!infowindowOpen);
		},
		[infowindowOpen, map],
	);

	// Initialize MarkerClusterer, if the map has changed
	useEffect(() => {
		if (!map) return;
		if (!clusterer.current) {
			clusterer.current = new MarkerClusterer({ map });
		}
	}, [map]);

	return (
		<>
			{pois.map((poi: Poi) => (
				<>
					<AdvancedMarker
						key={poi.key}
						position={poi.location}
						ref={markerRef}
						// ref={(marker) => setMarkerRef(marker, poi.key)}
						clickable
						onClick={handleClick}
						// title={poi.key}
					>
						{/* <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          /> */}
					</AdvancedMarker>
					{infowindowOpen && (
						<InfoWindow
							anchor={marker}
							maxWidth={200}
							onCloseClick={() => setInfowindowOpen(false)}
						>
							{poi.key}
						</InfoWindow>
					)}
				</>
			))}
		</>
	);
}

export default PoiMarkers;
