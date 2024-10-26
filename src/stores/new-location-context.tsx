import React, { createContext, type ReactNode, useState, useMemo } from 'react';

interface INewLocationContext {
	selectedPlace: google.maps.places.PlaceResult | null;
	setSelectedPlace: React.Dispatch<
		React.SetStateAction<google.maps.places.PlaceResult | null>
	>;
	onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
	inputValue: string;
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const initialContext: INewLocationContext = {
	selectedPlace: null,
	setSelectedPlace: () => undefined,
	onPlaceSelect: () => undefined,
	inputValue: '',
	setInputValue: () => undefined,
};

export const NewLocationContext =
	createContext<INewLocationContext>(initialContext);

export default function NewLocationProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [selectedPlace, setSelectedPlace] =
		useState<google.maps.places.PlaceResult | null>(null);
	const [inputValue, setInputValue] = useState<string>('');

	const newLocationContext: INewLocationContext = useMemo(() => {
		const onPlaceSelect = (
			place: google.maps.places.PlaceResult | null,
		) => {
			setSelectedPlace(place);
		};

		return {
			selectedPlace,
			setSelectedPlace,
			onPlaceSelect,
			inputValue,
			setInputValue,
		};
	}, [selectedPlace, setSelectedPlace, inputValue, setInputValue]);

	return (
		<NewLocationContext.Provider value={newLocationContext}>
			{children}
		</NewLocationContext.Provider>
	);
}
