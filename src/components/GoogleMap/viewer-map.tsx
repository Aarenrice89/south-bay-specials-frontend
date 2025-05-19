import React, { useState, useCallback, useEffect } from 'react';

import {
	APIProvider,
	Map,
	type AdvancedMarkerAnchorPoint,
	Pin,
	InfoWindow,
} from '@vis.gl/react-google-maps';
import { Grid, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { getLocations } from 'src/services/api/methods';
import { type FormattedLocation, type LocationsQueryParams } from 'types';
import useSplitPanelContext from 'hooks/use-split-panel';
import AdvancedMarkerWithRef from './advanced-marker-with-ref';

export type AnchorPointName = keyof typeof AdvancedMarkerAnchorPoint;

function ExistingLocationGoogleMap() {
	const [markers, setMarkers] = useState<FormattedLocation[]>([]);

	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [selectedPlace, setSelectedPlace] =
		useState<FormattedLocation | null>(null);

	const [selectedMarker, setSelectedMarker] =
		useState<google.maps.marker.AdvancedMarkerElement | null>(null);
	const [infoWindowShown, setInfoWindowShown] = useState(false);

	const { hoverId, onMouseEnter, onMouseLeave } = useSplitPanelContext();

	const onMarkerClick = useCallback(
		(
			place: FormattedLocation,
			marker?: google.maps.marker.AdvancedMarkerElement,
		) => {
			setSelectedId(place.googlePlaceId);

			if (marker) {
				setSelectedMarker(marker);
				setSelectedPlace(place);
			}

			if (place.googlePlaceId !== selectedId) {
				setInfoWindowShown(true);
			} else {
				setInfoWindowShown((isShown) => !isShown);
			}
		},
		[selectedId],
	);

	const onMapClick = useCallback(() => {
		setSelectedId(null);
		setSelectedMarker(null);
		setSelectedPlace(null);
		setInfoWindowShown(false);
	}, []);

	const handleInfowindowCloseClick = useCallback(() => {
		setInfoWindowShown(false);
		setSelectedId(null);
	}, []);

	const selectedDay = '';

	const fetchLocationsByDay = ({ day }: LocationsQueryParams) => {
		getLocations({ day }).then((response) => {
			setMarkers(response.data);
		});
	};

	useEffect(() => {
		fetchLocationsByDay({ day: selectedDay });
	}, [selectedDay]);

	return (
		<div className="flex-grow rounded-l-md overflow-hidden">
			<APIProvider
				apiKey={import.meta.env.REACT_APP_MAPS_API_KEY}
				// onLoad={() => console.log('Maps API has loaded.')}
			>
				<Map
					mapId={import.meta.env.REACT_APP_MAPS_ID_KEY}
					defaultZoom={13}
					defaultCenter={{ lat: 33.860664, lng: -118.4009608 }}
					className="h-[calc(100vh-64px)] w-full"
					disableDefaultUI
					onClick={onMapClick}
				/>
				{markers.map((place) => {
					const isActive = [hoverId, selectedId].includes(
						place.googlePlaceId,
					);
					return (
						<AdvancedMarkerWithRef
							onMarkerClick={(
								marker: google.maps.marker.AdvancedMarkerElement,
							) => onMarkerClick(place, marker)}
							onMouseEnter={() =>
								onMouseEnter(place.googlePlaceId)
							}
							onMouseLeave={onMouseLeave}
							key={place.googlePlaceId}
							className={`custom-marker ${isActive ? 'animate-bounce' : ''}`}
							// style={{
							// 	transformOrigin:
							// 		AdvancedMarkerAnchorPoint.BOTTOM.join(' '),
							// }}
							position={{
								lat: place.latitude,
								lng: place.longitude,
							}}
							zIndex={isActive ? 1000 : 0}
						>
							<Pin
								background={isActive ? '#22ccff' : null}
								borderColor={isActive ? '#1e89a1' : null}
								glyphColor={isActive ? '#0f677a' : null}
							/>
						</AdvancedMarkerWithRef>
					);
				})}
				{infoWindowShown && selectedMarker && selectedPlace && (
					<InfoWindow
						anchor={selectedMarker}
						pixelOffset={[0, -2]}
						onCloseClick={handleInfowindowCloseClick}
						maxWidth={240}
						headerDisabled
					>
						<Grid
							container
							spacing={0}
							className="m-0 pl-2 overflow-hidden"
						>
							<Grid item xs={10} className="pt-2">
								<Grid item xs={12}>
									<h4 className="text-sm font-bold m-0">
										{selectedPlace.name}
									</h4>
								</Grid>
								<Grid item xs={12}>
									<p className="text-xs font-normal m-0 pt-2">
										{selectedPlace.address}
									</p>
								</Grid>
								<Grid item xs={12}>
									<a
										href={selectedPlace.googleUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-500 text-xs hover:underline"
									>
										View on Google Maps
									</a>
								</Grid>
							</Grid>
							<Grid item xs={2} className="pt-1">
								<IconButton
									size="small"
									edge="end"
									onClick={handleInfowindowCloseClick}
									className="CustomClearButton hover:text-blue-400"
								>
									<ClearIcon />
								</IconButton>
							</Grid>
						</Grid>
					</InfoWindow>
				)}
			</APIProvider>
		</div>
	);
}

export default ExistingLocationGoogleMap;
