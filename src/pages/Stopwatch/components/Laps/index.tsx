import { FC } from 'react';

import { Divider } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { LapsProps } from './types';
import Lap from './components/Lap';

const Laps: FC<LapsProps> = ({ laps = [], timer }) => {
	return (
		<VStack width='100%' divider={<Divider />}>
			<Lap {...timer} index={laps.length + 1} status='default' />

			{laps.map((lap, index) => (
				<Lap {...lap} key={index} />
			))}
		</VStack>
	);
};

export default Laps;
