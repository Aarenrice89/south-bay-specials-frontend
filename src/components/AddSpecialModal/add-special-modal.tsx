import React, { type Dispatch, type SetStateAction } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';

import { postNewSpecial } from 'src/services/api/methods';
import { type NewSpecial } from 'types';
import useNewLocationContext from 'src/hooks/use-new-location-context';
import NewLocationGoogleMap from '../GoogleMap/new-location-map';
import SpecialDetailsForm from '../SpecialDetailsForm/special-details';

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

function AddLocationModal({ open, setOpen }: Props) {
	const { setSelectedPlace, setInputValue } = useNewLocationContext();

	const formMethods = useForm<NewSpecial>({
		// defaultValues: { selectedPlace: null },
	});

	const handleClearForm = () => {
		formMethods.reset();
		setSelectedPlace(null);
		setInputValue('');
	};

	const handleClose = () => {
		setOpen(false);
		handleClearForm();
	};

	const onSubmit = (data: NewSpecial) => {
		if (!data.selectedPlace) {
			formMethods.setError('selectedPlace', {
				type: 'manual',
				message: 'Location is required',
			});
			return;
		}
		postNewSpecial(data);
		handleClearForm();
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
								<NewLocationGoogleMap />
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
