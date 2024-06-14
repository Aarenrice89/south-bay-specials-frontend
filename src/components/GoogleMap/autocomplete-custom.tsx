import React, {
	useEffect,
	useState,
	useCallback,
	FormEvent,
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

export const AutocompleteCustom = ({ onPlaceSelect }: Props) => {
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
	const [isDropdownOpen, setIsDropdownOpen] = useState(true);

	useEffect(() => {
		if (!places || !map) return;

		setAutocompleteService(new places.AutocompleteService());
		setPlacesService(new places.PlacesService(map));
		setSessionToken(new places.AutocompleteSessionToken());

		return () => setAutocompleteService(null);
	}, [map, places]);

	const fetchPredictions = useCallback(
		async (inputValue: string) => {
			if (!autocompleteService || !inputValue) {
				setPredictionResults([]);
				return;
			}

			const request = { input: inputValue, sessionToken };
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
				fields: ['geometry', 'name', 'formatted_address'],
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
							const { location } = placeDetails.geometry;
							map.setCenter(location);
							map.setZoom(15); // Adjust zoom level as needed
						}
					}
				},
			);

			setPredictionResults([]);
			setInputValue('');
			setIsDropdownOpen(false);
			setSessionToken(new places.AutocompleteSessionToken());
		},
		[placesService, sessionToken, map, onPlaceSelect],
	);

	// const handleSuggestionClick = useCallback(
	// 	(placeId: string) => {
	// 		if (!places) return;

	// 		const detailRequestOptions = {
	// 			placeId,
	// 			fields: ['geometry', 'name', 'formatted_address'],
	// 			sessionToken,
	// 		};

	// 		const detailsRequestCallback = (
	// 			placeDetails: google.maps.places.PlaceResult | null,
	// 		) => {
	// 			console.log(placeDetails);
	// 			onPlaceSelect(placeDetails);
	// 			setPredictionResults([]);
	// 			setInputValue(placeDetails?.formatted_address ?? '');
	// 			setSessionToken(new places.AutocompleteSessionToken());
	// 		};

	// 		placesService?.getDetails(
	// 			detailRequestOptions,
	// 			detailsRequestCallback,
	// 		);
	// 	},
	// 	[onPlaceSelect, places, placesService, sessionToken],
	// );

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
						{predictionResults.map(({ place_id, description }) => {
							return (
								<ListItemStyled
									key={place_id}
									onClick={() =>
										handleSuggestionClick(place_id)
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
						})}
					</List>
				</Dropdown>
			)}
		</Box>
	);
};
