import { memoize } from 'lodash';

import { Timer } from '../../types';

export const getSecondsFromTimer = memoize(({ hours = 0, minutes = 0, seconds = 0 }: Timer): number => {
	let s = seconds;

	if (hours > 0) {
		s = s + hours * 60 * 60;
	}

	if (minutes > 0) {
		s = s + minutes * 60;
	}

	return s;
});

export const getTimerFromSeconds = memoize(({ seconds = 0 }: Pick<Timer, 'seconds'>): Timer => {
	return {
		hours: Math.floor((seconds % (3600 * 24)) / 3600),
		minutes: Math.floor((seconds % 3600) / 60),
		seconds: Math.floor(seconds % 60)
	};
});
