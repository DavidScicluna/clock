import { FC } from 'react';

import { useGetColor } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { motion } from 'framer-motion';

import { useIsLive } from './common/hooks';
import { TimeDividerProps } from './common/types';

const TimeDivider: FC<TimeDividerProps> = ({ isLive = false, ...rest }) => {
	const color = useGetColor({ color: 'gray', type: 'text.primary' });

	const controls = useIsLive(isLive);

	return (
		<motion.div animate={controls}>
			<Text align='center' color={color} fontWeight='black' lineHeight={1} {...rest}>
				:
			</Text>
		</motion.div>
	);
};

export default TimeDivider;
