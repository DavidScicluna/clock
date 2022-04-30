import { memoize } from 'lodash';

import { Timer } from '../../types';

export const updateTimer = memoize(({ hours, minutes, seconds }: Timer): Timer => {
	let hr = hours;
	let min = minutes;
	let sec = seconds;

	if (hr === 0 && min === 0 && sec === 0) {
		sec = 0;
		min = 0;
		hr = 0;
	} else if (min !== 0 && sec === 0) {
		sec = 59;
		--min;
	} else if (hr !== 0 && min === 0 && sec === 0) {
		sec = 59;
		min = 59;
		--hr;
	} else {
		sec = --sec;
	}

	return { hours: hr, minutes: min, seconds: sec };
});
