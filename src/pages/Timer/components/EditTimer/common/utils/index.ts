import { Timer } from '../../../../../../store/slices/Timers/common/types';
import { EditTimerForm } from '../types';

export const getFormDefaultValues = (timer?: Timer, timers = 0): EditTimerForm => {
	const defaultValues: EditTimerForm = {
		time: { hr: 0, min: 0, sec: 0 },
		label: `Timer ${timers + 1}`,
		isRepeatable: true
	};

	if (timer) {
		const { label, time, isRepeatable } = timer;
		return { ...defaultValues, label, time, isRepeatable };
	} else {
		return { ...defaultValues };
	}
};
