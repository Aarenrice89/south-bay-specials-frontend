import * as React from 'react';
import { type Theme, useTheme } from '@mui/material/styles';
import {
	OutlinedInput,
	InputLabel,
	MenuItem,
	FormControl,
	InputAdornment,
	TextField,
	Paper,
	styled,
	List,
	// ListItem,
	IconButton,
	Typography,
	Box,
	ClickAwayListener,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { noop } from 'lodash';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const Dropdown = styled(Paper)({
	position: 'absolute',
	top: '100%',
	left: 0,
	right: 0,
	zIndex: 1000,
	backgroundColor: 'white',
	borderTop: '1px solid #d1d5db',
	borderRadius: '0 0 4px 4px',
	boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
	maxHeight: '200px',
	overflowY: 'auto',
});

// const ListItemStyled = styled(ListItem)({
// 	cursor: 'pointer',
// 	'&:hover': {
// 		backgroundColor: '#f0f0f0',
// 	},
// });

const days = [
	'All',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
	'Weekdays',
	'Weekends',
];

function getStyles(day: string, selectedDays: readonly string[], theme: Theme) {
	const isSelected = selectedDays.includes(day);
	return {
		fontWeight: isSelected
			? theme.typography.fontWeightMedium
			: theme.typography.fontWeightRegular,
		// backgroundColor: isSelected ? '#e5e5e5' : undefined,
		// color: isSelected ? 'red' : undefined,
	};
}
const handleClear = noop;

const handleClickAway = noop;

export function DayFilterSpecials() {
	const theme = useTheme();
	const [daysOfWeek, setDaysOfWeek] = React.useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof daysOfWeek>) => {
		const {
			target: { value },
		} = event;
		setDaysOfWeek(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		);
	};

	return (
		<div className="m-1 !w-[200px]">
			<FormControl
				fullWidth
				variant="outlined"
				size="small"
				sx={{
					'& .MuiInputLabel-root': { color: '#f3f4f6' }, // Tailwind gray-100
					'& .MuiOutlinedInput-root': {
						color: '#f3f4f6', // text color
						backgroundColor: '#1f2937', // Tailwind gray-800
						'& fieldset': {
							borderColor: '#4b5563', // Tailwind gray-600
						},
						'&:hover fieldset': {
							borderColor: '#d1d5db', // Tailwind gray-300
						},
						'&.Mui-focused fieldset': {
							borderColor: '#60a5fa', // Tailwind blue-400
						},
					},
					'& .MuiSvgIcon-root': { color: '#f3f4f6' }, // icon color
				}}
			>
				<InputLabel id="multiple-day-label">
					<Typography>Day</Typography>
				</InputLabel>
				<Select
					labelId="multiple-day-label"
					id="multiple-day"
					multiple
					value={daysOfWeek}
					onChange={handleChange}
					input={<OutlinedInput label="Day" />}
					MenuProps={MenuProps}
					defaultValue={['All']}
				>
					{days.map((day) => (
						<MenuItem
							key={day}
							value={day}
							style={getStyles(day, daysOfWeek, theme)}
						>
							{day}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}

export function SearchSpecials() {
	return (
		<Box
			className="pt-3 relative mx-auto"
			// ref={containerRef}
		>
			<TextField
				className={`bg-white shadow-md `}
				variant="outlined"
				placeholder="Search Specials"
				// value={inputValue}
				fullWidth
				autoComplete="off"
				// onInput={(event: FormEvent<HTMLInputElement>) =>
				// 	onInputChange(event)
				// }
				// sx={{
				// 	border: errors[name] ? '2px solid #f44336' : 'none',
				// 	'& fieldset': {
				// 		border: 'none',
				// 	},
				// }}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon className="text-gray-500 hover:text-blue-400" />
						</InputAdornment>
					),
					endAdornment: (
						<IconButton
							className="CustomClearButton hover:text-blue-400"
							edge="end"
							onClick={handleClear}
						>
							<ClearIcon />
						</IconButton>
					),
					classes: {
						notchedOutline: 'border-none',
					},
				}}
			/>
			<ClickAwayListener onClickAway={handleClickAway}>
				<Dropdown className="overflow-x-hidden">
					<List>
						{/* {predictionResults.map(
								({ place_id: googlePlaceId, description }) => {
									return (
										<ListItemStyled
											key={googlePlaceId}
											onClick={() =>
												handleSuggestionClick(
													googlePlaceId,
												)
											}
											className="text-xs"
										>
											<Typography
												variant="body2"
												className="overflow-hidden truncate"
											>
												{description}
											</Typography>
										</ListItemStyled>
									);
								},
							)} */}
					</List>
				</Dropdown>
			</ClickAwayListener>
		</Box>
	);
}
