import { FC, useCallback, useState } from 'react';

import { Space, useGetColor } from '@davidscicluna/component-library';

import { Center, Container, VStack } from '@chakra-ui/react';

import { sort } from 'fast-sort';

import { useStopwatch } from './common/hooks';
import { StopwatchLaps as StopwatchLapsType } from './common/types';
import { updateLaps } from './common/utils';
import StopwatchControls from './components/StopwatchControls';
import StopwatchLaps from './components/StopwatchLaps';
import StopwatchProgress from './components/StopwatchProgress';

export const spacing: Space = 4;

const Stopwatch: FC = () => {
	const [timer, hasStarted, { onStart, onStop, onReset }] = useStopwatch();

	const [laps, setLaps] = useState<StopwatchLapsType>([]);

	const background = useGetColor({ color: 'gray', type: 'background' });

	const handleReset = useCallback((): void => {
		onReset();
		setLaps([]);
	}, []);

	const handleStart = useCallback((): void => onStart(), []);

	const handlePause = useCallback((): void => onStop(), []);

	const handleSetLap = useCallback((): void => {
		setLaps(sort(updateLaps({ laps, timer })).desc(({ index }) => index));
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
