import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useCountdown } from 'usehooks-ts';

import { setTimer } from '../../../../../../store/slices/Timers';
import { Timer } from '../../../../../../store/slices/Timers/common/types';
import { getSecondsFromTimer, getTimerFromSeconds } from '../utils';

type UseTimerProps = { timer: Timer };
type UseTimerReturn = [number, Record<'onStart' | 'onStop' | 'onReset', () => void>];

const interval = 1000;

const useTimer = ({ timer }: UseTimerProps): UseTimerReturn => {
	const dispatch = useDispatch();

	const { time, status } = timer;

	const [elapsed, { start: onStart, stop: onStop, reset: onReset }] = useCountdown({
		seconds: getSecondsFromTimer({ ...time }),
		interval,
		isIncrement: false
	});

	const handleUpdateTimerTime = (): void => {
		if (status === 'started') {
			const { hr = 0, min = 0, sec = 0 } = getTimerFromSeconds(elapsed);
			dispatch(setTimer({ ...timer, time: { ...timer, hr, min, sec } }));
		}
	};

	useEffect(() => handleUpdateTimerTime(), [elapsed]);

	return [elapsed, { onStart, onStop, onReset }];
};

export default useTimer;
