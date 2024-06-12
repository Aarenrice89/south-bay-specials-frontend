import React, { type Dispatch, type SetStateAction } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	children: React.ReactNode;
}

function AddLocationModal({ open, setOpen, children }: Props) {
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
			<DialogTitle textAlign="center">
				Select location from map
			</DialogTitle>
			<DialogContent>
				<div className="flex h-60vh w-full">{children}</div>
			</DialogContent>
		</Dialog>
	);
}

export default AddLocationModal;
