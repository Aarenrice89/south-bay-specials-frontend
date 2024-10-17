import { z } from 'zod';

const dayOfWeek = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
] as const;

const time = [
	'00:00',
	'01:00',
	'02:00',
	'03:00',
	'04:00',
	'05:00',
	'06:00',
	'07:00',
	'08:00',
	'09:00',
	'10:00',
	'11:00',
	'12:00',
	'13:00',
	'14:00',
	'15:00',
	'16:00',
	'17:00',
	'18:00',
	'19:00',
	'20:00',
	'21:00',
	'22:00',
	'23:00',
] as const;

export const specialSchema = z.object({
	id: z.number(),
	name: z.string(),
	location: z.number(),
	description: z.string(),
	limitations: z.string().nullable(),
	dayOfWeek: z.enum(dayOfWeek),
	startTime: z.enum(time),
	endTime: z.enum(time),
});

export const specialListSchema = z.array(specialSchema);

export interface SpecialResponse extends z.infer<typeof specialSchema> {}
export interface SpecialListResponse
	extends z.infer<typeof specialListSchema> {}
