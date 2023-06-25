import { CreateTimerForm } from '../types';

export const getFormDefaultValues = (timers = 0): CreateTimerForm => {
	return {
		time: { hr: 0, min: 0, sec: 0 },
		label: `Timer ${timers + 1}`,
		isRepeatable: true
	};
};
