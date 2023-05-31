import { memoize } from 'lodash';

import { Timer } from '../../../../common/types';

export const updateStopwatch = memoize(({ hours, minutes, seconds, milliseconds }: Timer): Timer => {
	let hr = hours;
	let min = minutes;
	let sec = seconds;
	let ms = milliseconds;

	ms = ++ms;

	if (ms === 100) {
		ms = 0;
		sec = ++sec;
	}

	if (sec === 60) {
		sec = 0;
		min = ++min;
	}

	if (min === 60) {
		min = 0;
		hr = ++hr;
	}

	return { hours: hr, minutes: min, seconds: sec, milliseconds: ms };
});
