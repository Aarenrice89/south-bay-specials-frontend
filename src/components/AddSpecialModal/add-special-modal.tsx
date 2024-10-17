/* eslint-disable no-console */
import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

import { useForm, FormProvider } from 'react-hook-form';

import GoogleMap from '../GoogleMap/map';
import SpecialDetailsForm from '../SpecialDetailsForm/special-details';

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	// children: React.ReactNode;
}

interface FormValues {
	name: string;
	description: string;
	limitations: string;
	dayOfWeek: string;
	startTime: string;
	endTime: string;
	selectedPlace: google.maps.places.PlaceResult | null;
}

function AddLocationModal({ open, setOpen }: Props) {
	const [selectedPlace, setSelectedPlace] =
		useState<google.maps.places.PlaceResult | null>(null);

	const formMethods = useForm<FormValues>({
		defaultValues: { selectedPlace: null },
	});

	const onSubmit = (data: FormValues) => {
		console.log('Form submitted:', data);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			onClose={handleClose}
			open={open}
			fullWidth
			maxWidth="lg"
			sx={{
				'.MuiDialogContent-root': {
					paddingLeft: 1,
					paddingRight: 1,
					paddingY: 0,
				},
			}}
		>
			<DialogTitle textAlign="center">
				Add New Food/Drink Special
			</DialogTitle>
			<DialogContent>
				<FormProvider {...formMethods}>
					<form
						onSubmit={formMethods.handleSubmit(onSubmit)}
						className="pt-2 px-2 flex-grow rounded-r-md overflow-hidden"
					>
						<div className="w-full">
							<div className="grid grid-cols-2 divide-x">
								<GoogleMap
									onPlaceSelect={(place) => {
										console.log('Place selected:', place);
										console.log(
											'selectedPlace:',
											selectedPlace,
										);
										setSelectedPlace(place);
										formMethods.setValue(
											'selectedPlace',
											place,
										);
									}}
								/>
								<SpecialDetailsForm />
							</div>
						</div>
						<Button className="size-full" type="submit">
							Submit
						</Button>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
}

export default AddLocationModal;
