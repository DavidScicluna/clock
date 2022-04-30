import { FC } from 'react';

import { HStack } from '@chakra-ui/react';

import Item from './components/Item';
import { PickProps } from './types';

const Pick: FC<PickProps> = ({ hours, minutes, seconds, onItemClick }) => {
	return (
		<HStack width='100%' align='center' justify='center' spacing={2}>
			<Item
				caption='Hours'
				minValue={0}
				maxValue={23}
				value={hours}
				onClick={(num: number) => onItemClick('hours', num)}
			/>
			<Item
				caption='Minutes'
				minValue={0}
				maxValue={59}
				value={minutes}
				onClick={(num: number) => onItemClick('minutes', num)}
			/>
			<Item
				caption='Seconds'
				minValue={0}
				maxValue={59}
				value={seconds}
				onClick={(num: number) => onItemClick('seconds', num)}
			/>
		</HStack>
	);
};

export default Pick;
