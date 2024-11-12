import { z } from 'zod';
import { getDayNames, getTimeValueSelect } from 'src/services/date-time-utils';
import { locationSchema, locationBaseSchema } from './location';

// Extract the values for the enums
const dayOfWeekValues = getDayNames().map((day) => day.value);
const timeValues = getTimeValueSelect().map((time) => time.value);

const specialBaseSchema = z.object({
	name: z.string(),
	description: z.string(),
	limitations: z.string().nullable(),
	dayOfWeek: z.enum(dayOfWeekValues as [string, ...string[]]),
	startTime: z.enum(timeValues as [string, ...string[]]).nullable(),
	endTime: z.enum(timeValues as [string, ...string[]]).nullable(),
});

export const newSpecialRequestSchema = specialBaseSchema.extend({
	selectedPlace: locationSchema,
});

export const newSpecialResponseSchema = specialBaseSchema.extend({
	location: locationSchema,
});

export const groupedSpecialResponseSchema = z.object({
	location: locationBaseSchema,
	specials: z.array(specialBaseSchema),
});
