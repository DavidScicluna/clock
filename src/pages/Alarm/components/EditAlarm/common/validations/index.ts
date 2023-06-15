import { z } from 'zod';

export const timerFormSchema = z.object({
	time: z
		.object({
			h: z.number().gte(0).lte(23),
			m: z.number().gte(0).lte(59)
		})
		.required()
		.refine(({ h, m }) => h > 0 || m > 0, { message: 'Time must not be empty!' })
});

export const detailsFormSchema = z.object({
	label: z.string().max(15),
	repeat: z.array(z.number()).min(0).max(7),
	hasSnooze: z.boolean()
});
