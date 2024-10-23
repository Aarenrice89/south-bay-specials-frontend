import React, { createContext, type ReactNode, useState, useMemo } from 'react';

interface INewLocationContext {
	selectedPlace: google.maps.places.PlaceResult | null;
	setSelectedPlace: React.Dispatch<
		React.SetStateAction<google.maps.places.PlaceResult | null>
	>;
	onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const initialContext: INewLocationContext = {
	selectedPlace: null,
	setSelectedPlace: () => undefined,
	onPlaceSelect: () => undefined,
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
		};
	}, [selectedPlace, setSelectedPlace]);

	return (
		<NewLocationContext.Provider value={newLocationContext}>
			{children}
		</NewLocationContext.Provider>
	);
}
