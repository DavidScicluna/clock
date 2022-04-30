import { memoize } from 'lodash';

import { Timer } from '../types';

export const checkTimer = memoize(({ hours = 0, minutes = 0 }: Timer): { hours: boolean; minutes: boolean } => {
	let hasHours = false;
	let hasMinutes = false;

	if (hours > 0) {
		hasHours = true;
	} else {
		hasHours = false;
	}

	if (minutes > 0 || (hours > 0 && minutes === 0)) {
		hasMinutes = true;
	} else {
		hasMinutes = false;
	}

	return { hours: hasHours, minutes: hasMinutes };
});
