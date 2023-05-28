import { FC, useCallback, useEffect, useState } from 'react';

import { Fade } from '@davidscicluna/component-library';

import { Center, VStack } from '@chakra-ui/react';

import { AnimatePresence } from 'framer-motion';
import { useCountdown, useUpdateEffect } from 'usehooks-ts';

import TimePicker from '../../components/TimePicker';
import { TimePickerOnPickProps } from '../../components/TimePicker/common/types';

import { Status } from './common/types';
import { getSecondsFromTimer } from './common/utils';
import TimerControls from './components/TimerControls';
import TimerProgress from './components/TimerProgress';

const Timer: FC = () => {
	const [status, setStatus] = useState<Status>('picker');

	const [hoursPicked, setHoursPicked] = useState<number>(0);
	const [minutesPicked, setMinutesPicked] = useState<number>(0);
	const [secondsPicked, setSecondsPicked] = useState<number>(0);

	const [totalSeconds, setTotalSeconds] = useState<number>(0);

	const [elapsed, { start: onStart, stop: onStop, reset: onReset }] = useCountdown({
		seconds: totalSeconds,
		interval: 1000,
		isIncrement: false
	});

	const handleGetSecondsFromTimer = useCallback((): void => {
		setTotalSeconds(getSecondsFromTimer({ hours: hoursPicked, minutes: minutesPicked, seconds: secondsPicked }));
	}, [hoursPicked, minutesPicked, secondsPicked]);

	const handleItemClick = useCallback(({ type, value }: TimePickerOnPickProps): void => {
		switch (type) {
			case 'h':
				setHoursPicked(value <= 0 ? 0 : value >= 23 ? 23 : value);
				break;
			case 'm':
				setMinutesPicked(value <= 0 ? 0 : value >= 59 ? 59 : value);
				break;
			case 's':
				setSecondsPicked(value <= 0 ? 0 : value >= 59 ? 59 : value);
				break;
		}
	}, []);

	const handleClear = useCallback((): void => {
		onReset();

		setHoursPicked(0);
		setMinutesPicked(0);
		setSecondsPicked(0);

		setTotalSeconds(0);
	}, []);

	const handleReset = useCallback((): void => {
		onReset();

		setStatus('picker');
	}, []);

	const handleResumePause = useCallback((): void => {
		if (status === 'pause') {
			onStart();

			setStatus('start');
		} else {
			onStop();

			setStatus('pause');
		}
	}, [status]);

	const handleStart = useCallback((): void => {
		onStart();

		setStatus('start');
	}, []);

	const handleCheckIfComplete = useCallback((): void => {
		if (elapsed === 0) {
			onStop();

			setStatus('picker');

			setTimeout(() => onReset(), 250);
		}
	}, [elapsed]);

	useEffect(() => onReset(), [totalSeconds]);

	useUpdateEffect(() => handleGetSecondsFromTimer(), [hoursPicked, minutesPicked, secondsPicked]);

	useUpdateEffect(() => handleCheckIfComplete(), [elapsed]);

	return (
		<Center width='100%' height='100%' p={4}>
			<VStack alignItems='center' justifyContent='center' spacing={4}>
				<AnimatePresence>
					{status === 'picker' ? (
						<Fade in>
							<Center width='50vw' alignItems='stretch' justifyContent='stretch'>
								<TimePicker
									onPick={handleItemClick}
									options={{
										h: { minValue: 0, maxValue: 23, value: hoursPicked },
										m: { minValue: 0, maxValue: 59, value: minutesPicked },
										s: { minValue: 0, maxValue: 59, value: secondsPicked }
									}}
									size='xl'
								/>
							</Center>
						</Fade>
					) : (
						<Fade in>
							<TimerProgress status={status} elapsed={elapsed} total={totalSeconds} />
						</Fade>
					)}
				</AnimatePresence>

				<TimerControls
					status={status}
					pickedTimer={{ hours: hoursPicked, minutes: minutesPicked, seconds: secondsPicked }}
					onClear={handleClear}
					onReset={handleReset}
					onResumePause={handleResumePause}
					onStart={handleStart}
				/>
			</VStack>
		</Center>
	);
};

export default Timer;
