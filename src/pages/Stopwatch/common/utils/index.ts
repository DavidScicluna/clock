import { memoize, compact } from 'lodash';

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

export const getStopwatchLabel = memoize(({ hours = 0, minutes = 0, seconds = 0, milliseconds = 0 }: Timer): string => {
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

export const getStopwatchValue = memoize(({ hours, minutes, seconds, milliseconds }: Timer): number =>
	Number(getStopwatchLabel({ hours, minutes, seconds, milliseconds }).replaceAll(/:/g, ''))
);
