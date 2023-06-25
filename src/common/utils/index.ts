import { Undefinable } from '@davidscicluna/component-library';

import dayjs from 'dayjs';
import { compact } from 'lodash';
import memoize from 'micro-memoize';

import { TimeFormat, TimeTypeShort, WeekDayIndex } from '../types';

type CheckHasTimeTypesProps = Record<TimeTypeShort, number>;
type CheckHasTimeTypesReturn = Record<TimeTypeShort, boolean>;

export const checkHasTimeTypes = memoize((time: CheckHasTimeTypesProps): CheckHasTimeTypesReturn => {
	const { hr = 0, min = 0, sec = 0, ms = 0 } = time;
	return {
		hr: hr > 0,
		min: min > 0 || (hr > 0 && min === 0),
		sec: sec > 0 || (hr > 0 && min > 0 && sec === 0),
		ms: ms > 0 || (hr > 0 && min > 0 && sec > 0 && ms === 0)
	};
});

// export const getTimeValue = memoize((props: GetTimeProps): number => {
// 	return Number(getTimeLabel(props).replaceAll(/:/g, ''));
// });

type FormatTimeTypeProps = { timeType: TimeTypeShort; format: 'full' | 'short' | 'initial' };

export const formatTimeType = memoize(({ timeType, format }: FormatTimeTypeProps): string => {
	switch (timeType) {
		case 'hr':
			return format === 'full' ? 'Hour' : format === 'short' ? 'Hr' : 'H';
		case 'min':
			return format === 'full' ? 'Minute' : format === 'short' ? 'Min' : 'M';
		case 'sec':
			return format === 'full' ? 'Second' : format === 'short' ? 'Sec' : 'S';
		case 'ms':
			return format === 'full' ? 'Millisecond' : 'Ms';
	}
});

type FormatTimeProps = { time: number; timeType: TimeTypeShort; timeFormat: TimeFormat };

export const formatTime = memoize(({ time, timeType, timeFormat }: FormatTimeProps): string => {
	const date = dayjs(new Date()).set(
		timeType === 'hr' ? 'hour' : timeType === 'min' ? 'minute' : timeType === 'sec' ? 'second' : 'millisecond',
		time
	);

	if (timeType === 'hr') {
		if (timeFormat === '12hr') {
			return date.format('hh');
		} else {
			return date.format('HH');
		}
	} else {
		switch (timeType) {
			case 'min':
				return date.format('mm');
			case 'sec':
				return date.format('ss');
			case 'ms':
				return date.format('SSS');
		}
	}
});

type GetTimeProps = {
	time: Record<TimeTypeShort, number>;
	timeFormat: TimeFormat;
	options?: Record<TimeTypeShort, boolean>;
};

export const getTimeLabel = memoize(({ time, timeFormat, options }: GetTimeProps): string => {
	const { hr = 0, min = 0, sec = 0, ms = 0 } = time;
	const { hr: hasHr = true, min: hasMin = true, sec: hasSec = true, ms: hasMs = true } = options || {};

	let hours: Undefinable<string>;
	let minutes: Undefinable<string>;
	let seconds: Undefinable<string>;
	let milliseconds: Undefinable<string>;

	if (hr > 0 && hasHr) {
		hours = formatTime({ time: hr, timeType: 'hr', timeFormat });
	}

	if ((min > 0 || (hr > 0 && min === 0)) && hasMin) {
		minutes = formatTime({ time: min, timeType: 'min', timeFormat });
	}

	if ((sec > 0 || (hr > 0 && min > 0 && sec === 0)) && hasSec) {
		seconds = formatTime({ time: sec, timeType: 'sec', timeFormat });
	}

	if ((ms > 0 || (hr > 0 && min > 0 && sec > 0 && ms === 0)) && hasMs) {
		if (sec === 0) {
			seconds = formatTime({ time: sec, timeType: 'sec', timeFormat });
		}
		milliseconds = formatTime({ time: ms, timeType: 'ms', timeFormat });
	}

	return compact([hours, minutes, seconds, milliseconds]).join(':');
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

/**
 * This method will convert our local WeekDayIndex value to the JS Date Day format
 * Local Format: 0 - 6 | Mon - Sun
 * JS Format: 0 - 6 | Sun - Sat
 */

export const getWeekDayValue = memoize((day: WeekDayIndex): WeekDayIndex => {
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
