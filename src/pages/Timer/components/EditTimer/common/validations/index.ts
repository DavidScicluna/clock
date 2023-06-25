import { z } from 'zod';

export const formSchema = z.object({
	label: z.string().max(15),
	time: z
		.object({
			hr: z.number().gte(0).lte(23),
			min: z.number().gte(0).lte(59),
			sec: z.number().gte(0).lte(59)
		})
		.required()
		.refine(({ hr, min, sec }) => hr > 0 || min > 0 || sec > 0, { message: 'Time must not be empty!' }),
	isRepeatable: z.boolean()
});
