import React, { useState } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	MenuItem,
	Button,
} from '@mui/material';

import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { paths } from 'enums';
import useAuthContext from 'hooks/use-auth';
import NewLocationProvider from 'providers/new-location-provider';
import AddSpecialModal from '../AddSpecialModal/add-special-modal';

export default function HeaderBar() {
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openAddSpecialModal, setOpenAddSpecialModal] =
		useState<boolean>(false);

	const { isAuthenticated, logout } = useAuthContext();

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSignIn = () => {
		navigate(paths.login);
	};

	const handleSignOut = () => {
		logout();
		handleClose();
	};

	const handleAddSpecial = () => {
		setOpenAddSpecialModal(true);
	};

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="logo"
						onClick={() => navigate(paths.root)}
					>
						<img
							src="Logo.png"
							alt="Logo"
							className="rounded-full"
							style={{ width: 50, height: 50 }}
						/>
					</IconButton>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						South Bay Specials
					</Typography>
					{isAuthenticated ? (
						<>
							<Button color="inherit" onClick={handleAddSpecial}>
								Add Special
							</Button>
							<IconButton
								edge="end"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem onClick={handleSignOut}>
									Sign Out
								</MenuItem>
							</Menu>
						</>
					) : (
						<Button color="inherit" onClick={handleSignIn}>
							Sign In
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<NewLocationProvider>
				<AddSpecialModal
					open={openAddSpecialModal}
					setOpen={setOpenAddSpecialModal}
				/>
			</NewLocationProvider>
		</>
	);
}
