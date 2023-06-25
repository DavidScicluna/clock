import { AlertStatus } from '@davidscicluna/component-library';

import memoize from 'micro-memoize';

import { Timer } from '../../../../../../store/slices/Timers/common/types';

export const getSecondsFromTimer = memoize(({ hr = 0, min = 0, sec = 0 }: Timer['time']): number => {
	let seconds = sec;

	if (hr > 0) {
		seconds = seconds + hr * 60 * 60;
	}

	if (min > 0) {
		seconds = seconds + min * 60;
	}

	return seconds;
});

export const getTimerFromSeconds = memoize((seconds: number): Timer['time'] => {
	return {
		hr: Math.floor((seconds % (3600 * 24)) / 3600),
		min: Math.floor((seconds % 3600) / 60),
		sec: Math.floor(seconds % 60)
	};
});

type GetTimerToastIDProps = { timerID: Timer['id']; type: AlertStatus };

export const getTimerToastID = memoize(({ timerID, type }: GetTimerToastIDProps): string => {
	return `ds-clock-timer-${timerID}-${type}-toast`;
});
