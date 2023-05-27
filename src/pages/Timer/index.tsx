import { FC, useCallback, useEffect, useState } from 'react';

import { Fade } from '@davidscicluna/component-library';

import { Center, VStack } from '@chakra-ui/react';

import { AnimatePresence } from 'framer-motion';
import { useCountdown, useUpdateEffect } from 'usehooks-ts';

import { Status } from './common/types';
import { getSecondsFromTimer } from './common/utils';
import PickTimer from './components/PickTimer';
import { PickTimerOnPickProps } from './components/PickTimer/common/types';
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

	const handleItemClick = useCallback(({ type, num }: PickTimerOnPickProps): void => {
		switch (type) {
			case 'hours':
				setHoursPicked(num <= 0 ? 0 : num >= 23 ? 23 : num);
				break;
			case 'minutes':
				setMinutesPicked(num <= 0 ? 0 : num >= 59 ? 59 : num);
				break;
			case 'seconds':
				setSecondsPicked(num <= 0 ? 0 : num >= 59 ? 59 : num);
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
			<VStack align='center' justify='center' spacing={4}>
				<AnimatePresence>
					{status === 'picker' ? (
						<Fade in>
							<PickTimer
								hours={hoursPicked}
								minutes={minutesPicked}
								seconds={secondsPicked}
								onPick={handleItemClick}
							/>
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
