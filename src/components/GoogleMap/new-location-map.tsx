import React from 'react';

import {
	APIProvider,
	Map,
	ControlPosition,
	useAdvancedMarkerRef,
	AdvancedMarkerAnchorPoint,
	AdvancedMarker,
	Pin,
	InfoWindow,
} from '@vis.gl/react-google-maps';

import { Grid } from '@mui/material';
import useNewLocationContext from 'hooks/use-new-location';
import CustomMapControl from './map-control';
import MapHandler from './map-handler';

function NewLocationGoogleMap() {
	const { selectedPlace } = useNewLocationContext();
	const [markerRef, marker] = useAdvancedMarkerRef();

	return (
		<APIProvider apiKey={import.meta.env.REACT_APP_MAPS_API_KEY}>
			<div className="flex-grow rounded-l-md overflow-hidden">
				<Map
					mapId={import.meta.env.REACT_APP_MAPS_ID_KEY}
					defaultZoom={13}
					defaultCenter={{ lat: 33.860664, lng: -118.4009608 }}
					className="h-[80vh] w-full"
					disableDefaultUI
				>
					{selectedPlace ? (
						<>
							<AdvancedMarker
								ref={markerRef}
								key={selectedPlace.place_id}
								position={selectedPlace.geometry?.location}
								anchorPoint={
									AdvancedMarkerAnchorPoint.BOTTOM_CENTER
								}
							>
								<Pin
									background="#22ccff"
									borderColor="#1e89a1"
									glyphColor="#0f677a"
								/>
							</AdvancedMarker>
							<InfoWindow
								anchor={marker}
								maxWidth={240}
								headerDisabled
							>
								<Grid
									container
									spacing={0}
									className="m-0 px-2 pt-2"
								>
									<Grid item xs={12}>
										<h4 className="text-sm font-bold m-0">
											{selectedPlace.name}
										</h4>
									</Grid>
									<Grid item xs={12}>
										<p className="text-xs font-normal m-0 pt-2">
											{selectedPlace.formatted_address}
										</p>
									</Grid>
									<Grid item xs={12}>
										<a
											href={selectedPlace.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-500 text-xs hover:underline"
										>
											View on Google Maps
										</a>
									</Grid>
								</Grid>
							</InfoWindow>
						</>
					) : null}
				</Map>
				<CustomMapControl
					controlPosition={ControlPosition.TOP_CENTER}
				/>
				<MapHandler place={selectedPlace} />
			</div>
		</APIProvider>
	);
}

export default NewLocationGoogleMap;
