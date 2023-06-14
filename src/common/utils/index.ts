import dayjs from 'dayjs';
import { compact } from 'lodash';
import memoize from 'micro-memoize';

import {} from '../../store/slices/App/common/types';
import { TimeFormat, Timer, TimerTypeFull, TimerTypeShort, WeekDayIndex } from '../types';

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

type FormatTimerTypeProps = { timerType: TimerTypeShort; format: 'full' | 'short' };

export const formatTimerType = memoize(({ timerType, format }: FormatTimerTypeProps): string => {
	switch (timerType) {
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

type FormatTimerNumberProps = { time: number; timerType: TimerTypeShort; timeFormat: TimeFormat };

export const formatTimerNumber = memoize(({ time, timerType, timeFormat }: FormatTimerNumberProps): string => {
	const date = dayjs(new Date()).set(timerType, time);

	if (timerType === 'h') {
		if (timeFormat === '12hr') {
			return date.format('hh');
		} else {
			return date.format('HH');
		}
	} else {
		switch (timerType) {
			case 'm':
				return date.format('mm');
			case 's':
				return date.format('ss');
			case 'ms':
				return date.format('SSS');
		}
	}
});

type GetWeekDayLabelProps = { day: WeekDayIndex; format: 'full' | 'short' | 'initial' };

export const getWeekDayLabel = memoize(({ day, format }: GetWeekDayLabelProps): string => {
	switch (day) {
		case 0:
			return format === 'full' ? 'Monday' : format === 'short' ? 'Mon' : 'M';
		case 1:
			return format === 'full' ? 'Tuesday' : format === 'short' ? 'Tue' : 'T';
		case 2:
			return format === 'full' ? 'Wednesday' : format === 'short' ? 'Wed' : 'W';
		case 3:
			return format === 'full' ? 'Thursday' : format === 'short' ? 'Thu' : 'T';
		case 4:
			return format === 'full' ? 'Friday' : format === 'short' ? 'Fri' : 'F';
		case 5:
			return format === 'full' ? 'Saturday' : format === 'short' ? 'Sat' : 'S';
		case 6:
			return format === 'full' ? 'Sunday' : format === 'short' ? 'Sun' : 'S';
	}
});

type GetWeekDayValueProps = { day: WeekDayIndex };

/**
 * This method will convert our local WeekDayIndex value to the JS Date Day format
 * Local Format: 0 - 6 | Mon - Sun
 * JS Format: 0 - 6 | Sun - Sat
 */

export const getWeekDayValue = memoize(({ day }: GetWeekDayValueProps): WeekDayIndex => {
	switch (day) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		case 6:
			return 0;
	}
});
