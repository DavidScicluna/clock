import { Undefinable } from '@davidscicluna/component-library';

import { isNil, memoize, orderBy } from 'lodash';
import { v4 as uuid } from 'uuid';

import { Timer } from '../../../../common/types';
import { getTimerValue } from '../../../../common/utils';
import { StopwatchLap, StopwatchLaps } from '../types';

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

type UpdateLapsProps = { laps: StopwatchLaps; timer: Timer };

export const updateLaps = memoize(({ laps = [], timer }: UpdateLapsProps): StopwatchLaps => {
	let updatedLaps: StopwatchLaps = [...laps];

	const { hours, minutes, seconds, milliseconds } = timer;

	const lap: StopwatchLap = {
		id: uuid(),
		index: laps.length + 1,
		hours,
		minutes,
		seconds,
		milliseconds,
		status: 'default'
	};

	updatedLaps.push(lap);

	if (updatedLaps.length >= 3) {
		let slowest: Undefinable<StopwatchLap> = undefined;
		let fastest: Undefinable<StopwatchLap> = undefined;

		orderBy(updatedLaps, 'index').forEach((lap, index) => {
			if (!isNil(slowest) && !isNil(fastest)) {
				const lapTime = getTimerValue({
					hours: lap.hours,
					minutes: lap.minutes,
					seconds: lap.seconds,
					milliseconds: lap.milliseconds
				});
				const nextLap = updatedLaps[index - 1];
				const nextLapTime = getTimerValue({
					hours: nextLap.hours,
					minutes: nextLap.minutes,
					seconds: nextLap.seconds,
					milliseconds: nextLap.milliseconds
				});

				const difference = lapTime - nextLapTime;

				const slowestLapTime = getTimerValue({
					hours: slowest.hours,
					minutes: slowest.minutes,
					seconds: slowest.seconds,
					milliseconds: slowest.milliseconds
				});
				const fastestLapTime = getTimerValue({
					hours: fastest.hours,
					minutes: fastest.minutes,
					seconds: fastest.seconds,
					milliseconds: fastest.milliseconds
				});

				if (difference < fastestLapTime) {
					fastest = { ...lap };
				} else if (difference > slowestLapTime) {
					slowest = { ...lap };
				}
			} else {
				slowest = { ...lap };
				fastest = { ...lap };
			}
		});

		updatedLaps = updatedLaps.map((lap) => {
			if (lap.id === slowest?.id) {
				return { ...lap, status: 'slowest' };
			} else if (lap.id === fastest?.id) {
				return { ...lap, status: 'fastest' };
			} else {
				return { ...lap, status: 'default' };
			}
		});
	}

	return [...updatedLaps];
});
