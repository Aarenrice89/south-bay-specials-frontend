import { flatMap, range } from 'lodash';
import { type NewSpecialSelectProps } from 'types';

export const getDayNames = (): NewSpecialSelectProps[] => {
	const days = range(0, 7).map((day: number) => {
		const date = new Date();
		date.setDate(date.getDate() - date.getDay() + day);
		const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
		return { value: dayName.toLowerCase(), display: dayName };
	});
	days.push(
		{ value: 'weekend', display: 'Weekend' },
		{ value: 'weekday', display: 'Weekday' },
	);
	return days;
};

export const formatTime = (hour: number, minute: number): string => {
	const period = hour < 12 ? 'AM' : 'PM';
	const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
	const formattedMinute = minute.toString().padStart(2, '0');
	return `${formattedHour}:${formattedMinute} ${period}`;
};

export const getTimeValueSelect = (): NewSpecialSelectProps[] => {
	return flatMap(range(0, 24), (hour: number) => {
		return range(0, 60, 60).map((minute: number) => {
			const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
			const displayString = formatTime(hour, minute);
			return { value: timeString, display: displayString };
		});
	});
};
