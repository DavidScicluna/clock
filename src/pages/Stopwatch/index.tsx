import { FC, useState, useCallback } from 'react';

import { useBoolean, VStack, Center, Collapse } from '@chakra-ui/react';

import { compact, isEmpty, isNil, orderBy } from 'lodash';
import { useInterval } from 'usehooks-ts';
import { v4 as uuid } from 'uuid';

import { getTimerValue } from '../../common/utils';

import { updateStopwatch } from './common/utils';
import Actions from './components/Actions';
import Laps from './components/Laps';
import { Lap } from './components/Laps/components/Lap/types';
import Progress from './components/Progress';

const Stopwatch: FC = () => {
	const [hasStarted, setHasStarted] = useBoolean();

	const [hours, setHours] = useState<number>(0);
	const [minutes, setMinutes] = useState<number>(0);
	const [seconds, setSeconds] = useState<number>(0);
	const [milliseconds, setMilliseconds] = useState<number>(0);

	const [laps, setLaps] = useState<Lap[]>([]);

	const handleTimer = useCallback((): void => {
		const timer = updateStopwatch({ hours, minutes, seconds, milliseconds });

		setHours(timer.hours);
		setMinutes(timer.minutes);
		setSeconds(timer.seconds);
		setMilliseconds(timer.milliseconds);
	}, [hours, minutes, seconds, milliseconds]);

	const handleReset = useCallback((): void => {
		setHours(0);
		setMinutes(0);
		setSeconds(0);
		setMilliseconds(0);

		setLaps([]);
	}, []);

	const handleStartPause = useCallback((): void => setHasStarted.toggle(), []);

	const handleSetLap = useCallback((): void => {
		let updatedLaps: Lap[] = [...laps];

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
	}, [laps, hours, minutes, seconds, milliseconds]);

	useInterval(() => handleTimer(), hasStarted ? 10 : null);

	return (
		<Center width='100%' height='100%' p={4}>
			<VStack height='100%' align='center' justify='center' spacing={4}>
				<VStack width='100%' align='center' justify='center' spacing={2}>
					<Progress timer={{ hours, minutes, seconds, milliseconds }} />

					<Actions
						hasStarted={hasStarted}
						timer={{ hours, minutes, seconds, milliseconds }}
						onReset={handleReset}
						onStartPause={handleStartPause}
						onSetLap={handleSetLap}
					/>
				</VStack>

				<Collapse
					in={hasStarted || !isEmpty(compact([hours, minutes, seconds, milliseconds]))}
					unmountOnExit
					style={{ width: '100%', height: 'auto', overflowY: 'auto' }}
				>
					<Laps laps={laps} timer={{ hours, minutes, seconds, milliseconds }} />
				</Collapse>
			</VStack>
		</Center>
	);
};

export default Stopwatch;
