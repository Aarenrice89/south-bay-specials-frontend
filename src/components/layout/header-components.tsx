import * as React from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Checkbox,
	FormControlLabel,
	Typography,
	InputBase,
} from '@mui/material';
import { Search, Clear, ExpandMore } from '@mui/icons-material';

interface SearchSpecialsProps {
	search: string;
	setSearch: (value: string) => void;
	handleClear: () => void;
}
interface DayFilterSpecialsProps {
	dayOfWeek: string[];
	handleDayChange: (day: string) => void;
}

const days = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
	'Weekday',
	'Weekend',
];
export function DayFilterSpecials({
	dayOfWeek,
	handleDayChange,
}: DayFilterSpecialsProps) {
	return (
		<Accordion
			className="!bg-gray-600 !text-gray-200 shadow-none my-2 border-0"
			elevation={0}
			sx={{
				'&:before': { display: 'none' },
				'&:after': { display: 'none' },
			}}
		>
			<AccordionSummary
				expandIcon={<ExpandMore className="text-gray-400" />}
				aria-controls="panel1-content"
				id="panel1-header"
			>
				<Typography component="span" className="font-semibold">
					Filter by Day
				</Typography>
			</AccordionSummary>
			<AccordionDetails className="flex flex-col gap-1">
				{days.map((day) => (
					<FormControlLabel
						key={day}
						control={
							<Checkbox
								checked={dayOfWeek.includes(day)}
								onChange={() => handleDayChange(day)}
								sx={{
									color: '#94a3b8',
									'&.Mui-checked': {
										color: '#38bdf8',
									},
								}}
							/>
						}
						label={day}
						className="!text-gray-200"
					/>
				))}
			</AccordionDetails>
		</Accordion>
	);
}

export function SearchSpecials({
	search,
	setSearch,
	handleClear,
}: SearchSpecialsProps) {
	return (
		<div className="flex items-center bg-gray-600 rounded px-2 py-1 mb-2">
			<Search className="text-gray-200 mr-2" fontSize="small" />
			<InputBase
				placeholder="Search specials"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="w-full !placeholder-gray-200 !text-gray-200"
			/>
			<Clear
				className="text-gray-400 mr-2 hover:text-blue-500"
				fontSize="small"
				onClick={handleClear}
			/>
		</div>
	);
}
