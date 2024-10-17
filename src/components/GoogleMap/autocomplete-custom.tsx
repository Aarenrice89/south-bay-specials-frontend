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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
	onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

interface selectedLocationProps {
	name?: string;
	address?: string;
	phone?: string;
	website?: string;
	placeId?: string;
	googleUrl?: string;
	geometry?: google.maps.places.PlaceGeometry;
}

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

function AutocompleteCustom({ onPlaceSelect }: Props) {
	const map = useMap();
	const places = useMapsLibrary('places');
	const containerRef = useRef<HTMLDivElement>(null);

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

	const [inputValue, setInputValue] = useState<string>('');
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(true);
	const [selectedLocation, setSelectedLocation] =
		useState<selectedLocationProps | null>(null);

	useEffect(() => {
		if (!places || !map) return;

		setAutocompleteService(new places.AutocompleteService());
		setPlacesService(new places.PlacesService(map));
		setSessionToken(new places.AutocompleteSessionToken());

		// return () => setAutocompleteService(null);

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
		[fetchPredictions],
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
					'placeId',
					'url',
				],
				sessionToken,
			};

			placesService.getDetails(
				detailRequestOptions,
				(placeDetails: google.maps.places.PlaceResult | null) => {
					if (placeDetails) {
						onPlaceSelect(placeDetails);

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
						setSelectedLocation({
							name: placeDetails.name,
							address: placeDetails.formatted_address,
							phone: placeDetails.formatted_phone_number,
							website: placeDetails.website,
							placeId: placeDetails.place_id,
							googleUrl: placeDetails.url,
							geometry: placeDetails.geometry,
						});
					}
				},
			);
			// eslint-disable-next-line no-console
			console.log('selectedLocation: ', selectedLocation);
			setPredictionResults([]);
			setIsDropdownOpen(false);
			setSessionToken(new places.AutocompleteSessionToken());
		},
		[
			placesService,
			sessionToken,
			map,
			onPlaceSelect,
			places,
			selectedLocation,
		],
	);

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (
			containerRef.current &&
			!containerRef.current.contains(event.target as Node)
		) {
			setIsDropdownOpen(false);
		}
	}, []);

	const handleClear = () => {
		setInputValue('');
		setPredictionResults([]);
		setIsDropdownOpen(false);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside]);

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
					border: 'none',
					'& fieldset': { border: 'none' },
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
					disableUnderline: true,
				}}
			/>
			{isDropdownOpen && predictionResults.length > 0 && (
				<Dropdown className="overflow-x-hidden">
					<List>
						{predictionResults.map(
							({ place_id: placeId, description }) => {
								return (
									<ListItemStyled
										key={placeId}
										onClick={() =>
											handleSuggestionClick(placeId)
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
			)}
		</Box>
	);
}

export default AutocompleteCustom;
