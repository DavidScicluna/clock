import { compact, memoize } from 'lodash';

import { Timer } from '../types';

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

export const getTimerLabel = memoize(({ hours = 0, minutes = 0, seconds = 0, milliseconds = 0 }: Timer): string => {
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

export const getTimerValue = memoize(({ hours, minutes, seconds, milliseconds }: Timer): number =>
	Number(getTimerLabel({ hours, minutes, seconds, milliseconds }).replaceAll(/:/g, ''))
);

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
