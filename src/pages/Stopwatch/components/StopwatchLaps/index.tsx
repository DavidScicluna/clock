import { FC } from 'react';

import { Collapse, Divider } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { StopwatchLapsProps } from './common/types';
import StopwatchLap from './components/StopwatchLap';

const StopwatchLaps: FC<StopwatchLapsProps> = ({ laps = [], timer, hasLaps = false }) => {
	return (
		<Collapse in={hasLaps} style={{ width: '100%', height: '100%' }}>
			<VStack width='100%' height='100%' divider={<Divider />}>
				<StopwatchLap {...timer} index={laps.length + 1} isCurrent status='default' />

				{laps.map((lap) => (
					<StopwatchLap {...lap} key={lap.id} />
				))}
			</VStack>
		</Collapse>
	);
};

export default StopwatchLaps;
