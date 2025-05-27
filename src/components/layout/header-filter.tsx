import React, { useState } from 'react';
import {
	IconButton,
	Tooltip,
	Menu,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Checkbox,
	FormControlLabel,
	InputBase,
	Button,
	Divider,
} from '@mui/material';
import { FilterList, Search, ExpandMore } from '@mui/icons-material';

const days = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

export default function HeaderFilter() {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const [search, setSearch] = useState('');

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorElUser(null);
	};

	const handleDayChange = (day: string) => {
		setSelectedDays((prev) =>
			prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
		);
	};

	const handleFilter = () => {
		// Perform filter action here
		handleClose();
	};

	return (
		<>
			<IconButton
				edge="start"
				color="inherit"
				aria-label="filter-specials"
				aria-controls="menu-appbar"
				className="hover:!text-blue-500 transition !ease-in-out"
				aria-haspopup="true"
				onClick={handleMenu}
			>
				<Tooltip title="Filter Specials">
					<FilterList />
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
				slotProps={{
					paper: {
						className:
							'!bg-gray-600 text-gray-100 min-w-[340px] px-12 py-2 flex flex-col',
						style: {
							borderRadius: 16,
							boxShadow: '0px 3px 12px rgba(0,0,0,0.15)',
							maxHeight: 420, // clamp menu height
							display: 'flex',
							flexDirection: 'column',
						},
					},
				}}
			>
				{/* Non-scrollable header */}
				<div>
					<div className="flex items-center bg-gray-600 rounded px-2 py-1 mb-2">
						<Search
							className="text-gray-200 mr-2"
							fontSize="small"
						/>
						<InputBase
							placeholder="Search specials"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full !placeholder-gray-100 !text-gray-100"
						/>
					</div>
					<Divider className="!bg-gray-100 !mb-4" />
				</div>
				{/* Scrollable content */}
				<div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-600 rounded-r-2xl">
					<Accordion
						className="!bg-gray-600 !text-gray-200 shadow-none my-2 border-0"
						elevation={0}
						sx={{
							'&:before': { display: 'none' },
							'&:after': { display: 'none' },
						}}
					>
						<AccordionSummary
							expandIcon={
								<ExpandMore className="text-gray-400" />
							}
							aria-controls="panel1-content"
							id="panel1-header"
						>
							<Typography
								component="span"
								className="font-semibold"
							>
								Filter by Day
							</Typography>
						</AccordionSummary>
						<AccordionDetails className="flex flex-col gap-1">
							{days.map((day) => (
								<FormControlLabel
									key={day}
									control={
										<Checkbox
											checked={selectedDays.includes(day)}
											onChange={() =>
												handleDayChange(day)
											}
											sx={{
												color: '#94a3b8',
												'&.Mui-checked': {
													color: '#38bdf8',
												},
											}}
										/>
									}
									label={day}
									className="!text-gray-100"
								/>
							))}
						</AccordionDetails>
					</Accordion>
				</div>
				<Divider className="!bg-gray-100 !mb-4" />
				{/* Sticky footer */}
				<div className="sticky bottom-0 inset-x-0 bg-gray-600 z-10 !mt-8">
					<Button
						variant="outlined"
						color="inherit"
						onClick={handleFilter}
						className="!border-blue-500 !text-white hover:!bg-blue-500 hover:!text-white w-full"
					>
						<Typography className="text-xs !sm:text-base">
							Filter
						</Typography>
					</Button>
				</div>
			</Menu>
		</>
	);
}
