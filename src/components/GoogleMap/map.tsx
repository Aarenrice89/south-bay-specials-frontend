import React, { useState } from 'react';

import {
	APIProvider,
	Map,
	MapCameraChangedEvent,
	ControlPosition,
} from '@vis.gl/react-google-maps';

import PoiMarkers from './poi-marker';
import { Poi } from '../../types';
import { CustomMapControl } from './map-control';
import MapHandler from './map-handler';

const locations: Poi[] = [
	{
		key: 'American Junkie',
		location: { lat: 33.86200633981369, lng: -118.40043937895398 },
	},
];

const GoogleMap = () => {
	const [selectedPlace, setSelectedPlace] =
		useState<google.maps.places.PlaceResult | null>(null);
	return (
		<APIProvider
			apiKey={import.meta.env.VITE_GM_API_KEY}
			onLoad={() => console.log('Maps API has loaded.')}
		>
			<div className="flex-grow">
				<Map
					mapId={import.meta.env.VITE_GM_ID_KEY}
					defaultZoom={13}
					defaultCenter={{ lat: 33.860664, lng: -118.4009608 }}
					className="h-[80vh] w-full"
					disableDefaultUI={true}
				>
					{/* <PoiMarkers pois={locations} /> */}
				</Map>
				<CustomMapControl
					controlPosition={ControlPosition.TOP_CENTER}
					onPlaceSelect={setSelectedPlace}
				/>
				<MapHandler place={selectedPlace} />
			</div>
		</APIProvider>
	);
};

export default GoogleMap;
