import React, {
	useEffect,
	useState,
	useCallback,
	type FormEvent,
	useRef,
} from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import {
	InputAdornment,
	TextField,
	Paper,
	styled,
	List,
	ListItem,
	IconButton,
	Typography,
	Box,
	ClickAwayListener,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormContext } from 'react-hook-form';
import { type NewSpecialRequest, type FormattedLocation } from 'types';
import useNewLocationContext from 'hooks/use-new-location';

const Dropdown = styled(Paper)({
	position: 'absolute',
	top: '100%',
	left: 0,
	right: 0,
	zIndex: 1000,
	backgroundColor: 'white',
	borderTop: '1px solid #d1d5db',
	borderRadius: '0 0 4px 4px',
	boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
	maxHeight: '200px',
	overflowY: 'auto',
});

const ListItemStyled = styled(ListItem)({
	cursor: 'pointer',
	'&:hover': {
		backgroundColor: '#f0f0f0',
	},
});

const transformPlaceKeys = (
	place: google.maps.places.PlaceResult,
): FormattedLocation => ({
	name: place.name || null,
	address: place.formatted_address || null,
	phoneNumber: place.formatted_phone_number || null,
	website: place.website || null,
	googlePlaceId: place.place_id || '',
	googleUrl: place.url || '',
	latitude: place.geometry?.location?.lat() || 0,
	longitude: place.geometry?.location?.lng() || 0,
});

function AutocompleteCustom() {
	const map = useMap();
	const places = useMapsLibrary('places');
	const containerRef = useRef<HTMLDivElement>(null);
	const { setSelectedPlace, onPlaceSelect, inputValue, setInputValue } =
		useNewLocationContext();
	const {
		formState: { errors },
		clearErrors,
		setValue,
	} = useFormContext<NewSpecialRequest>();

	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
	const [sessionToken, setSessionToken] =
		useState<google.maps.places.AutocompleteSessionToken>();

	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
	const [autocompleteService, setAutocompleteService] =
		useState<google.maps.places.AutocompleteService | null>(null);

	// https://developers.google.com/maps/documentation/javascript/reference/places-service
	const [placesService, setPlacesService] =
		useState<google.maps.places.PlacesService | null>(null);

	const [predictionResults, setPredictionResults] = useState<
		Array<google.maps.places.AutocompletePrediction>
	>([]);

	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);

	useEffect(() => {
		if (!places || !map) return;

		setAutocompleteService(new places.AutocompleteService());
		setPlacesService(new places.PlacesService(map));
		setSessionToken(new places.AutocompleteSessionToken());
		// Cleanup function
		// eslint-disable-next-line consistent-return
		return () => {
			setAutocompleteService(null);
			setPlacesService(null);
			setSessionToken(undefined);
		};
	}, [map, places]);

	const fetchPredictions = useCallback(
		async (input: string) => {
			if (!autocompleteService || !input) {
				setPredictionResults([]);
				return;
			}

			const request = { input, sessionToken };
			const response =
				await autocompleteService.getPlacePredictions(request);

			setPredictionResults(response.predictions);
		},
		[autocompleteService, sessionToken],
	);

	const onInputChange = useCallback(
		(event: FormEvent<HTMLInputElement>) => {
			const value = (event.target as HTMLInputElement)?.value;

			setInputValue(value);
			fetchPredictions(value);
			setIsDropdownOpen(true);
		},
		[fetchPredictions, setInputValue],
	);

	const handleSuggestionClick = useCallback(
		(placeId: string) => {
			if (!placesService || !places) return;

			const detailRequestOptions = {
				placeId,
				fields: [
					'geometry',
					'name',
					'formatted_address',
					'formatted_phone_number',
					'website',
					'place_id',
					'url',
				],
				sessionToken,
			};

			placesService.getDetails(
				detailRequestOptions,
				(placeDetails: google.maps.places.PlaceResult | null) => {
					if (placeDetails) {
						onPlaceSelect(placeDetails);
						setValue(
							'selectedPlace',
							transformPlaceKeys(placeDetails),
						);
						clearErrors('selectedPlace');

						// Update map with new place details
						if (
							placeDetails.geometry &&
							placeDetails.geometry.location &&
							map
						) {
							// This doesnt seem to do anything
							const { location } = placeDetails.geometry;
							map.setCenter(location);
							map.setZoom(15);
						}
						setInputValue(
							placeDetails.name ? placeDetails.name : '',
						);
					}
				},
			);
			setPredictionResults([]);
			setIsDropdownOpen(false);
			setSessionToken(new places.AutocompleteSessionToken());
			onPlaceSelect(null);
		},
		[
			placesService,
			sessionToken,
			map,
			onPlaceSelect,
			places,
			clearErrors,
			setValue,
			setInputValue,
		],
	);

	const handleClear = () => {
		setInputValue('');
		setPredictionResults([]);
		setIsDropdownOpen(false);
		setSelectedPlace(null);
	};

	const handleClickAway = () => {
		setIsDropdownOpen(false);
	};

	const name = 'selectedPlace';

	return (
		<Box
			className="pt-3 relative w-screen max-w-md mx-auto"
			ref={containerRef}
		>
			<TextField
				className={`bg-white shadow-md ${predictionResults.length > 0 && isDropdownOpen ? 'rounded-t-xl rounded-b-xs' : 'rounded-full'}`}
				variant="outlined"
				placeholder="Search Google Maps"
				value={inputValue}
				fullWidth
				autoComplete="off"
				onInput={(event: FormEvent<HTMLInputElement>) =>
					onInputChange(event)
				}
				sx={{
					border: errors[name] ? '2px solid #f44336' : 'none',
					'& fieldset': {
						border: 'none',
					},
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon className="text-gray-500 hover:text-blue-400" />
						</InputAdornment>
					),
					endAdornment: (
						<IconButton
							className="CustomClearButton hover:text-blue-400"
							edge="end"
							onClick={handleClear}
						>
							<ClearIcon />
						</IconButton>
					),
					classes: {
						notchedOutline: 'border-none',
					},
				}}
			/>
			{isDropdownOpen && predictionResults.length > 0 && (
				<ClickAwayListener onClickAway={handleClickAway}>
					<Dropdown className="overflow-x-hidden">
						<List>
							{predictionResults.map(
								({ place_id: googlePlaceId, description }) => {
									return (
										<ListItemStyled
											key={googlePlaceId}
											onClick={() =>
												handleSuggestionClick(
													googlePlaceId,
												)
											}
											className="text-xs"
										>
											<Typography
												variant="body2"
												className="overflow-hidden truncate"
											>
												{description}
											</Typography>
										</ListItemStyled>
									);
								},
							)}
						</List>
					</Dropdown>
				</ClickAwayListener>
			)}
		</Box>
	);
}

export default AutocompleteCustom;
