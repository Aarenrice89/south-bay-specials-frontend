import React, { useState } from 'react';
import {
	AppBar,
	Avatar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	MenuItem,
	Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function HeaderBar() {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box className="flex flex-grow">
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="small"
						edge="start"
						className="mr-6"
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						className="flex flex-grow"
					>
						South Bay Specials
					</Typography>
					<Box className="flex flex-grow-0">
						<Tooltip title="Open settings">
							<IconButton
								onClick={handleOpenUserMenu}
								className="p-0"
							>
								<Avatar className="max-h-8 max-w-8">
									<Typography variant="body1">AR</Typography>
								</Avatar>
							</IconButton>
						</Tooltip>
						<Menu
							className="mt-10 ml-2"
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem
									key={setting}
									onClick={handleCloseUserMenu}
								>
									<Typography textAlign="center">
										{setting}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
