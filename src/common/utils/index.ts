import { compact, memoize } from 'lodash';

import { Timer } from '../types';

export const updateTimer = memoize(({ hours, minutes, seconds, milliseconds }: Timer): Timer => {
	let hr = hours;
	let min = minutes;
	let sec = seconds;
	let ms = milliseconds;

	ms = ++ms;

	if (ms === 100) {
		sec = ++sec;
		ms = 0;
	}

	if (sec === 60) {
		min = ++min;
		sec = 0;
	}

	if (min === 60) {
		hr = ++hr;
		min = 0;
	}

	return { hours: hr, minutes: min, seconds: sec, milliseconds: ms };
});

export const updateTimerLabel = memoize((timer: Timer): string => {
	const { hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = timer;

	const hr = hours > 0 ? (hours >= 10 ? hours : `0${hours}`) : 0;
	const min =
		minutes > 0 || (hours > 0 && minutes === 0)
			? minutes >= 10
				? minutes
				: minutes > 0
				? `0${minutes}`
				: '00'
			: 0;
	const sec = seconds >= 10 ? seconds : `0${seconds}`;
	const ms = milliseconds >= 10 ? milliseconds : `0${milliseconds}`;

	return compact([hr, min, `${sec}.${ms}`]).join(':');
});

export const checkTimer = memoize((timer: Timer) => {
	const { hours = 0, minutes = 0 } = timer;

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