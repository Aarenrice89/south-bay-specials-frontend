import React, { useState, useEffect, useRef } from 'react';
import {
	ControlPosition,
	MapControl,
	useMapsLibrary,
} from '@vis.gl/react-google-maps';

import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type CustomAutocompleteControlProps = {
	controlPosition: ControlPosition;
	onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

export const CustomMapControl = ({
	controlPosition,
	onPlaceSelect,
}: CustomAutocompleteControlProps) => {
	const [placeAutocomplete, setPlaceAutocomplete] =
		useState<google.maps.places.Autocomplete | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const places = useMapsLibrary('places');

	useEffect(() => {
		if (!places || !inputRef.current) return;

		const options = {
			fields: ['geometry', 'name', 'formatted_address'],
		};

		setPlaceAutocomplete(
			new places.Autocomplete(inputRef.current, options),
		);
	}, [places]);

	useEffect(() => {
		if (!placeAutocomplete) return;

		placeAutocomplete.addListener('place_changed', () => {
			onPlaceSelect(placeAutocomplete.getPlace());
		});
	}, [onPlaceSelect, placeAutocomplete]);

	console.log('places', places);

	return (
		<MapControl position={controlPosition}>
			<div className="autocomplete-control">
				<div className="autocomplete-container">
					{/* <input ref={inputRef} /> */}
					<div className="pt-4">
						<TextField
							className="bg-white rounded-full shadow-md w-full max-w-md"
							variant="outlined"
							placeholder="Search Google Maps"
							inputRef={inputRef}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon className="text-gray-500" />
									</InputAdornment>
								),
								classes: {
									notchedOutline: 'border-none',
								},
							}}
						/>
					</div>
				</div>
			</div>
		</MapControl>
	);
};
