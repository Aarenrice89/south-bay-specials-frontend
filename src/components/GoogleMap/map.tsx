import React, { useState } from 'react';

import { APIProvider, Map, ControlPosition } from '@vis.gl/react-google-maps';

import { type Poi } from '../../types';
import PoiMarkers from './poi-marker';
import CustomMapControl from './map-control';
import MapHandler from './map-handler';

const locations: Poi[] = [
	{
		key: 'American Junkie',
		location: { lat: 33.86200633981369, lng: -118.40043937895398 },
	},
	{
		key: 'Slice and Pint',
		location: { lat: 33.92021438029151, lng: -118.4156467697085 },
	},
];

interface GoogleMapProps {
	onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

function GoogleMap({ onPlaceSelect }: GoogleMapProps) {
	const [selectedPlace, setSelectedPlace] =
		useState<google.maps.places.PlaceResult | null>(null);

	const handlePlaceSelect = (
		place: google.maps.places.PlaceResult | null,
	) => {
		setSelectedPlace(place);
		onPlaceSelect(place);
	};

	return (
		<APIProvider
			apiKey={import.meta.env.REACT_APP_MAPS_API_KEY}
			// eslint-disable-next-line no-console
			onLoad={() => console.log('Maps API has loaded.')}
		>
			<div className="flex-grow rounded-l-md overflow-hidden">
				<Map
					mapId={import.meta.env.REACT_APP_MAPS_ID_KEY}
					defaultZoom={13}
					defaultCenter={{ lat: 33.860664, lng: -118.4009608 }}
					className="h-[80vh] w-full"
					disableDefaultUI
				>
					<PoiMarkers pois={locations} />
				</Map>
				<CustomMapControl
					controlPosition={ControlPosition.TOP_CENTER}
					onPlaceSelect={handlePlaceSelect}
				/>
				<MapHandler place={selectedPlace} />
			</div>
		</APIProvider>
	);
}

export default GoogleMap;
