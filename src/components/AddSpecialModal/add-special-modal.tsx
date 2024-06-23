import React, { type Dispatch, type SetStateAction } from 'react';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material';

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
			// PaperProps={{
			// 	style: { backgroundColor: 'transparent', boxShadow: 'none' },
			// }}
		>
			<DialogTitle textAlign="center">
				Add New Food/Drink Special
			</DialogTitle>
			<DialogContent>
				<div className="w-full">{children}</div>
				<Button className="w-full h-full">Submit</Button>
			</DialogContent>
		</Dialog>
	);
}

export default AddLocationModal;
