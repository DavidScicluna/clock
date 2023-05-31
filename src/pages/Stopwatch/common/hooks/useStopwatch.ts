import { useCallback, useState } from 'react';

import { useBoolean } from '@davidscicluna/component-library';

import { useInterval } from 'usehooks-ts';

import { Timer } from '../../../../common/types';
import { updateStopwatch } from '../utils';

type UseStopwatchControls = Record<'onStart' | 'onStop' | 'onReset', () => void>;
type UseStopwatchReturn = [Timer, boolean, UseStopwatchControls];

const useStopwatch = (): UseStopwatchReturn => {
	const [hasStarted, setHasStarted] = useBoolean();

	const [hours, setHours] = useState<number>(0);
	const [minutes, setMinutes] = useState<number>(0);
	const [seconds, setSeconds] = useState<number>(0);
	const [milliseconds, setMilliseconds] = useState<number>(0);

	const handleStartTimer = useCallback((): void => {
		setHasStarted.on();
	}, []);

	const handleStopTimer = useCallback((): void => {
		setHasStarted.off();
	}, []);

	const handleUpdateTimer = (): void => {
		const timer = updateStopwatch({ hours, minutes, seconds, milliseconds });

		setHours(timer.hours);
		setMinutes(timer.minutes);
		setSeconds(timer.seconds);
		setMilliseconds(timer.milliseconds);
	};

	const handleResetTimer = useCallback((): void => {
		setHours(0);
		setMinutes(0);
		setSeconds(0);
		setMilliseconds(0);

		setHasStarted.off();
	}, []);

	useInterval(() => handleUpdateTimer(), hasStarted ? 10 : null);

	return [
		{ hours, minutes, seconds, milliseconds },
		hasStarted,
		{ onStart: handleStartTimer, onStop: handleStopTimer, onReset: handleResetTimer }
	];
};

export default useStopwatch;
