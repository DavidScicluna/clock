import { compact, memoize } from 'lodash';

import { Timer, TimerTypeFull, TimerTypeShort } from '../types';

type CheckTimerReturn = { [key in TimerTypeFull]: boolean };

export const checkTimer = memoize((timer: Timer): CheckTimerReturn => {
	const { hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = timer;

	let hasHours = false;
	let hasMinutes = false;
	let hasSeconds = false;
	let hasMilliseconds = false;

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

	if (seconds > 0 || (hours > 0 && minutes > 0 && seconds === 0)) {
		hasSeconds = true;
	} else {
		hasSeconds = false;
	}

	if (milliseconds > 0 || (hours > 0 && minutes > 0 && seconds > 0 && milliseconds === 0)) {
		hasMilliseconds = true;
	} else {
		hasMilliseconds = false;
	}

	return { hours: hasHours, minutes: hasMinutes, seconds: hasSeconds, milliseconds: hasMilliseconds };
});

type TimerOptions = { [key in TimerTypeFull]: boolean };

export const getLabel = memoize((timer: Partial<Timer>, options?: Partial<TimerOptions>): string => {
	const { hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = timer;
	const {
		hours: hasHours = true,
		minutes: hasMinutes = true,
		seconds: hasSeconds = true,
		milliseconds: hasMilliseconds = true
	} = options || {};

	let hr: string | undefined;
	let min: string | undefined;
	let sec: string | undefined;
	let ms: string | undefined;

	if (hours > 0 && hasHours) {
		hr = String(hours).padStart(2, '0');
	}

	if ((minutes > 0 || (hours > 0 && minutes === 0)) && hasMinutes) {
		min = String(minutes).padStart(2, '0');
	}

	if ((seconds > 0 || (hours > 0 && minutes > 0 && seconds === 0)) && hasSeconds) {
		sec = String(seconds).padStart(2, '0');
	}

	if ((milliseconds > 0 || (hours > 0 && minutes > 0 && seconds > 0 && milliseconds === 0)) && hasMilliseconds) {
		if (seconds === 0) {
			sec = String(seconds).padStart(2, '0');
		}

		ms = String(milliseconds).padStart(2, '0');
	}

	return compact([hr, min, sec, ms]).join(':');
});

export const getTimerValue = memoize((timer: Partial<Timer>, options?: Partial<TimerOptions>): number =>
	Number(getLabel({ ...timer }, { ...options }).replaceAll(/:/g, ''))
);

type FormatTimerTypeProps = { type: TimerTypeShort; format: 'full' | 'short' };

export const formatTimerType = memoize(({ type, format }: FormatTimerTypeProps): string => {
	switch (type) {
		case 'h':
			return format === 'full' ? 'Hour' : 'Hr';
		case 'm':
			return format === 'full' ? 'Minute' : 'Min';
		case 's':
			return format === 'full' ? 'Second' : 'Sec';
		case 'ms':
			return format === 'full' ? 'Millisecond' : 'Ms';
	}
});
