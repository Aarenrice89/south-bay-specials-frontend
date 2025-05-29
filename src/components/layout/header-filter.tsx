import React, { useState } from 'react';
import {
	IconButton,
	Tooltip,
	Menu,
	Typography,
	Button,
	Divider,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import useSplitPanelContext from 'hooks/use-split-panel';
import { getGroupedSpecials } from 'src/services/api/methods';
import { type LocationsQueryParams } from 'types';
import { SearchSpecials, DayFilterSpecials } from './header-components';

export default function HeaderFilter() {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [dayOfWeek, setDayOfWeek] = useState<string[]>([]);
	const [search, setSearch] = useState('');

	const { setSpecialData } = useSplitPanelContext();

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorElUser(null);
	};

	const handleDayChange = (day: string) => {
		setDayOfWeek((prev) =>
			prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
		);
	};

	const fetchFilteredSpecials = (params: LocationsQueryParams) => {
		getGroupedSpecials(params).then((response) => {
			setSpecialData(response.data);
		});
	};

	const handleFilter = () => {
		fetchFilteredSpecials({ dayOfWeek, search });
		handleClose();
	};

	const handleClear = () => {
		setSearch('');
		fetchFilteredSpecials({ dayOfWeek, search: '' });
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
							'!bg-gray-600 text-gray-100 min-w-[340px] px-12 py-2 flex flex-col scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100',
						style: {
							borderRadius: 16,
							boxShadow: '0px 3px 12px rgba(0,0,0,0.15)',
							maxHeight: '60vh', // clamp menu height
							display: 'flex',
							flexDirection: 'column',
						},
					},
				}}
			>
				<div className="flex-1 min-h-0">
					{/* Search Bar */}
					<SearchSpecials
						search={search}
						setSearch={setSearch}
						handleClear={handleClear}
					/>
					<Divider className="!bg-gray-100 !mb-4" />
					{/* DOW Filter */}
					<DayFilterSpecials
						dayOfWeek={dayOfWeek}
						handleDayChange={handleDayChange}
					/>
				</div>
				<Divider className="!bg-gray-100 !mb-4" />
				{/* Sticky footer */}
				<div className="sticky bottom-0 inset-x-0 bg-gray-600 z-10">
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
