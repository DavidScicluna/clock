import { FC, useCallback, useState } from 'react';

import { Space, useGetColor } from '@davidscicluna/component-library';

import { Center, Container, VStack } from '@chakra-ui/react';

import { isNil, orderBy } from 'lodash';
import { v4 as uuid } from 'uuid';

import { getTimerValue } from '../../common/utils';

import { useStopwatch } from './common/hooks';
import StopwatchControls from './components/StopwatchControls';
import StopwatchLaps from './components/StopwatchLaps';
import { Lap } from './components/StopwatchLaps/components/StopwatchLap/common/types';
import StopwatchProgress from './components/StopwatchProgress';

const spacing: Space = 4;

const Stopwatch: FC = () => {
	const [timer, hasStarted, { onStart, onStop, onReset }] = useStopwatch();

	const [laps, setLaps] = useState<Lap[]>([]);

	const background = useGetColor({ color: 'gray', type: 'background' });

	const handleReset = useCallback((): void => {
		onReset();
		setLaps([]);
	}, []);

	const handleStart = useCallback((): void => onStart(), []);

	const handlePause = useCallback((): void => onStop(), []);

	const handleSetLap = useCallback((): void => {
		let updatedLaps: Lap[] = [...laps];

		const { hours, minutes, seconds, milliseconds } = timer;

		const lap: Lap = {
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
			let slowest: Lap | undefined = undefined;
			let fastest: Lap | undefined = undefined;

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

		setLaps(orderBy([...updatedLaps], 'index', ['desc']));
	}, [laps, timer]);

	return (
		<Container as={Center} width='100%' maxWidth='container.sm' height='100%' p={spacing}>
			<VStack
				width='100%'
				height='100%'
				position='relative'
				alignItems='center'
				justifyContent='center'
				spacing={spacing}
			>
				<VStack
					width='100%'
					position='sticky'
					top={78 + 32} // 78 Header height & 32 is padding top height
					background={background}
					alignItems='center'
					justifyContent='center'
					spacing={spacing}
				>
					<StopwatchProgress hasStarted={hasStarted} timer={timer} />

					<StopwatchControls
						hasStarted={hasStarted}
						timer={timer}
						onReset={handleReset}
						onStart={handleStart}
						onPause={handlePause}
						onSetLap={handleSetLap}
					/>
				</VStack>

				<StopwatchLaps laps={laps} timer={timer} hasLaps={hasStarted || laps.length > 0} />
			</VStack>
		</Container>
	);
};

export default Stopwatch;
