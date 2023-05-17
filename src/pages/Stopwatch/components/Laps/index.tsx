import { FC } from 'react';

import { Divider } from '@davidscicluna/component-library';

import { SlideFade, useBoolean, VStack } from '@chakra-ui/react';

import { AnimatePresence } from 'framer-motion';
import { useUpdateEffect } from 'usehooks-ts';

import Lap from './components/Lap';
import { LapsProps } from './types';

const Laps: FC<LapsProps> = ({ laps = [], timer }) => {
	const [animate, setAnimate] = useBoolean(true);

	useUpdateEffect(() => {
		setAnimate.off();

		setTimeout(() => setAnimate.on(), 100);
	}, [laps]);

	return (
		<AnimatePresence>
			<VStack width='100%' divider={<Divider />}>
				{animate && (
					<SlideFade key='active_lap' in unmountOnExit offsetY={9} style={{ width: '100%' }}>
						<Lap {...timer} index={laps.length + 1} status='default' />
					</SlideFade>
				)}

				{laps.map((lap, index) => (
					<Lap {...lap} key={index} />
				))}
			</VStack>
		</AnimatePresence>
	);
};

export default Laps;
