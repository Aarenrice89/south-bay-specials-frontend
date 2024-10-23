// /* eslint-disable react/jsx-curly-brace-presence */
// /* eslint-disable no-console */
// import React, { useState, useCallback } from 'react';

// import {
// 	APIProvider,
// 	Map,
// 	ControlPosition,
// 	type AdvancedMarkerAnchorPoint,
// 	Pin,
// 	InfoWindow,
// } from '@vis.gl/react-google-maps';

// // import { type Poi } from 'types';
// import { Grid, IconButton } from '@mui/material';
// import ClearIcon from '@mui/icons-material/Clear';
// import AdvancedMarkerWithRef from './advanced-marker-with-ref';
// import CustomMapControl from './map-control';
// import MapHandler from './map-handler';

// export type AnchorPointName = keyof typeof AdvancedMarkerAnchorPoint;

// interface GoogleMapProps {
// 	onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
// 	selectedPlace: google.maps.places.PlaceResult | null;
// }

// type MarkerData = {
// 	id: string;
// 	position: google.maps.LatLngLiteral;
// 	title: string;
// };

// const sampleData: MarkerData[] = [
// 	{
// 		id: '1',
// 		position: { lat: 33.860664, lng: -118.4009608 },
// 		title: 'title-1',
// 	},
// 	{
// 		id: '2',
// 		position: { lat: 33.860664, lng: -118.38 },
// 		title: 'title-2',
// 	},
// 	{
// 		id: '3',
// 		position: { lat: 33.860664, lng: -118.36 },
// 		title: 'title-3',
// 	},
// 	{
// 		id: '4',
// 		position: { lat: 33.860664, lng: -118.34 },
// 		title: 'title-4',
// 	},
// ] as const;

// function GoogleMap({ onPlaceSelect, selectedPlace }: GoogleMapProps) {
// 	const handlePlaceSelect = (
// 		place: google.maps.places.PlaceResult | null,
// 	) => {
// 		onPlaceSelect(place);
// 	};

// 	const [markers] = useState(sampleData);

// 	const [hoverId, setHoverId] = useState<string | null>(null);
// 	const [selectedId, setSelectedId] = useState<string | null>(null);
// 	const [selectedMarker, setSelectedMarker] =
// 		useState<google.maps.marker.AdvancedMarkerElement | null>(null);
// 	const [infoWindowShown, setInfoWindowShown] = useState(false);

// 	const onMouseEnter = useCallback((id: string | null) => setHoverId(id), []);
// 	const onMouseLeave = useCallback(() => setHoverId(null), []);
// 	const onMarkerClick = useCallback(
// 		(
// 			id: string | null,
// 			marker?: google.maps.marker.AdvancedMarkerElement,
// 		) => {
// 			setSelectedId(id);

// 			if (marker) {
// 				setSelectedMarker(marker);
// 			}

// 			if (id !== selectedId) {
// 				setInfoWindowShown(true);
// 			} else {
// 				setInfoWindowShown((isShown) => !isShown);
// 			}
// 		},
// 		[selectedId],
// 	);

// 	const onMapClick = useCallback(() => {
// 		setSelectedId(null);
// 		setSelectedMarker(null);
// 		setInfoWindowShown(false);
// 	}, []);

// 	const handleInfowindowCloseClick = useCallback(
// 		() => setInfoWindowShown(false),
// 		[],
// 	);

// 	return (
// 		<APIProvider
// 			apiKey={import.meta.env.REACT_APP_MAPS_API_KEY}
// 			onLoad={() => console.log('Maps API has loaded.')}
// 		>
// 			<div className="flex-grow rounded-l-md overflow-hidden">
// 				<Map
// 					mapId={import.meta.env.REACT_APP_MAPS_ID_KEY}
// 					defaultZoom={13}
// 					defaultCenter={{ lat: 33.860664, lng: -118.4009608 }}
// 					className="h-[80vh] w-full"
// 					disableDefaultUI
// 					onClick={onMapClick}
// 					// clickableIcons={false}
// 					// gestureHandling={'greedy'}
// 				>
// 					{markers.map(({ id, position }: MarkerData) => {
// 						return (
// 							<AdvancedMarkerWithRef
// 								onMarkerClick={(
// 									marker: google.maps.marker.AdvancedMarkerElement,
// 								) => onMarkerClick(id, marker)}
// 								onMouseEnter={() => onMouseEnter(id)}
// 								onMouseLeave={onMouseLeave}
// 								key={id}
// 								className="custom-marker"
// 								style={{
// 									transform: `scale(${[hoverId, selectedId].includes(id) ? 1.4 : 1})`,
// 								}}
// 								position={position}
// 							>
// 								<Pin
// 									background={
// 										selectedId === id ? '#22ccff' : null
// 									}
// 									borderColor={
// 										selectedId === id ? '#1e89a1' : null
// 									}
// 									glyphColor={
// 										selectedId === id ? '#0f677a' : null
// 									}
// 								/>
// 							</AdvancedMarkerWithRef>
// 						);
// 					})}
// 					{infoWindowShown && selectedMarker && (
// 						<InfoWindow
// 							anchor={selectedMarker}
// 							onCloseClick={handleInfowindowCloseClick}
// 							maxWidth={220}
// 							headerDisabled
// 						>
// 							<Grid
// 								container
// 								spacing={0}
// 								className="m-0 px-2 pt-2"
// 							>
// 								<Grid item xs={11}>
// 									<h4 className="text-sm font-bold m-0">
// 										location name
// 									</h4>
// 									<Grid container spacing={0}>
// 										<Grid item xs={12}>
// 											<p className="text-xs font-normal m-0 pt-2">
// 												2160 E El Segundo Blvd El
// 												Segundo, CA, 90245
// 											</p>
// 										</Grid>
// 										<Grid item xs={12}>
// 											<a
// 												href="https://www.google.com"
// 												target="_blank"
// 												rel="noopener noreferrer"
// 												className="text-blue-500 text-xs hover:underline"
// 											>
// 												View on Google Maps
// 											</a>
// 										</Grid>
// 									</Grid>
// 								</Grid>
// 								<Grid
// 									item
// 									xs={1}
// 									className="flex justify-end items-start"
// 								>
// 									<IconButton
// 										size="small"
// 										edge="end"
// 										onClick={() =>
// 											setInfoWindowShown(false)
// 										}
// 										className="CustomClearButton hover:text-blue-400"
// 									>
// 										<ClearIcon />
// 									</IconButton>
// 								</Grid>
// 							</Grid>
// 						</InfoWindow>
// 					)}
// 				</Map>
// 				<CustomMapControl
// 					controlPosition={ControlPosition.TOP_CENTER}
// 					// onPlaceSelect={handlePlaceSelect}
// 				/>
// 				<MapHandler place={selectedPlace} />
// 			</div>
// 		</APIProvider>
// 	);
// }

// export default GoogleMap;
