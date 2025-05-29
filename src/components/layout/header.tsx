import React, { useState } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	MenuItem,
	Button,
	Tooltip,
	Container,
	Divider,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { paths } from 'enums';
import useAuthContext from 'hooks/use-auth';
import NewLocationProvider from 'providers/new-location-provider';
import AddSpecialModal from '../AddSpecialModal/add-special-modal';
import HeaderFilter from './header-filter';

export default function HeaderBar() {
	const navigate = useNavigate();

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [openAddSpecialModal, setOpenAddSpecialModal] =
		useState<boolean>(false);

	const { isAuthenticated, logout } = useAuthContext();

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorElUser(null);
	};

	const handleLogIn = () => {
		navigate(paths.login);
	};
	const handleSignUp = () => {
		navigate(paths.signUp);
	};

	const handleSignOut = () => {
		logout();
		handleClose();
	};

	const handleEditProfile = () => {
		handleClose();
	};

	const handleAddSpecial = () => {
		setOpenAddSpecialModal(true);
	};

	return (
		<div className="m-2 rounded-2xl shadow-lg bg-transparent">
			<AppBar
				position="static"
				className="!bg-gray-800 rounded-2xl w-auto px-2"
				elevation={4}
			>
				<Container maxWidth="xl">
					<Toolbar
						disableGutters
						className="flex w-full items-center"
					>
						{/* Left: Logo */}
						<div className="flex items-center" id="logo">
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
									style={{ width: 40, height: 40 }}
								/>
							</IconButton>
							<Typography variant="h5" style={{ flexGrow: 1 }}>
								South Bay Specials
							</Typography>
						</div>
						{/* Center: Filter Specials */}
						<div className="flex-1 flex justify-end items-center">
							<HeaderFilter />
							<Divider
								className="!mx-4 !border-white "
								orientation="vertical"
								variant="middle"
								flexItem
							/>
							{/* Right: Login/Signup or User Menu */}
							{isAuthenticated ? (
								<div className="flex items-center space-x-2">
									<Button
										color="inherit"
										onClick={handleAddSpecial}
										className="hover:!text-blue-500"
									>
										<Typography fontSize="0.8rem">
											Add Special
										</Typography>
									</Button>
									<IconButton
										edge="end"
										aria-label="account of current user"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										onClick={handleMenu}
										color="inherit"
										className="hover:!text-blue-500 transition !ease-in-out"
									>
										<Tooltip title="Open settings">
											<AccountCircle className="!w-10 !h-10" />
										</Tooltip>
									</IconButton>
									<Menu
										id="menu-appbar"
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right',
										}}
										keepMounted
										transformOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
										open={Boolean(anchorElUser)}
										onClose={handleClose}
									>
										<MenuItem onClick={handleEditProfile}>
											Edit Profile
										</MenuItem>
										<MenuItem onClick={handleSignOut}>
											Sign Out
										</MenuItem>
									</Menu>
								</div>
							) : (
								<div className="flex items-center space-x-2 flex-nowrap">
									<Button
										color="inherit"
										onClick={handleLogIn}
										variant="text"
										className="hover:!text-blue-500"
									>
										<Typography fontSize="0.8rem">
											Log In
										</Typography>
									</Button>
									<Button
										color="inherit"
										onClick={handleSignUp}
										variant="outlined"
										className="!border-blue-500 !text-white hover:!bg-blue-500 hover:!text-white whitespace-nowrap"
									>
										<Typography className="text-xs !sm:text-base">
											Sign Up
										</Typography>
									</Button>
								</div>
							)}
						</div>
					</Toolbar>
				</Container>
			</AppBar>
			<NewLocationProvider>
				<AddSpecialModal
					open={openAddSpecialModal}
					setOpen={setOpenAddSpecialModal}
				/>
			</NewLocationProvider>
		</div>
	);
}
