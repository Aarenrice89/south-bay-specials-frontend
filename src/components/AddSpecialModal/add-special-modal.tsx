import React, { type Dispatch, type SetStateAction } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';

import { postNewSpecial, getGroupedSpecials } from 'src/services/api/methods';
import { type NewSpecialRequest } from 'types';
import useNewLocationContext from 'hooks/use-new-location';
import useSplitPanelContext from 'hooks/use-split-panel';
import NewLocationGoogleMap from '../GoogleMap/new-location-map';
import SpecialDetailsForm from '../SpecialDetailsForm/special-details';

function AddLocationModal({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const { setSelectedPlace, setInputValue } = useNewLocationContext();
	const { setSpecialData } = useSplitPanelContext();

	const formMethods = useForm<NewSpecialRequest>();

	const handleClearForm = () => {
		formMethods.reset();
		setSelectedPlace(null);
		setInputValue('');
	};

	const handleClose = () => {
		setOpen(false);
		handleClearForm();
	};

	const onSubmit = (data: NewSpecialRequest) => {
		if (!data.selectedPlace) {
			formMethods.setError('selectedPlace', {
				type: 'manual',
				message: 'Location is required',
			});
			return;
		}
		postNewSpecial(data).then(() => {
			getGroupedSpecials().then((response) => {
				setSpecialData(response.data);
			});
		});
		handleClose();
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
