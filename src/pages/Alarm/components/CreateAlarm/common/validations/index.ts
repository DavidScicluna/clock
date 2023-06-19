import { z } from 'zod';

export const timerFormSchema = z.object({
	time: z
		.object({
			hr: z.number().gte(0).lte(23),
			min: z.number().gte(0).lte(59)
		})
		.required()
		.refine(({ hr, min }) => hr > 0 || min > 0, { message: 'Time must not be empty!' })
});

export const detailsFormSchema = z.object({
	label: z.string().max(15),
	repeat: z.array(z.number()).min(0).max(7),
	hasSnooze: z.boolean()
});
