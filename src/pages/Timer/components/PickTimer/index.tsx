import { FC } from 'react';

import { HStack } from '@chakra-ui/react';

import { PickTimerProps } from './common/types';
import Picker from './components/Picker';

const PickTimer: FC<PickTimerProps> = ({ hours, minutes, seconds, onPick }) => {
	return (
		<HStack width='100%' align='center' justify='center' spacing={2}>
			<Picker
				caption='Hours'
				minValue={0}
				maxValue={23}
				value={hours}
				onPick={(num: number) => onPick({ type: 'hours', num })}
			/>
			<Picker
				caption='Minutes'
				minValue={0}
				maxValue={59}
				value={minutes}
				onPick={(num: number) => onPick({ type: 'minutes', num })}
			/>
			<Picker
				caption='Seconds'
				minValue={0}
				maxValue={59}
				value={seconds}
				onPick={(num: number) => onPick({ type: 'seconds', num })}
			/>
		</HStack>
	);
};

export default PickTimer;
