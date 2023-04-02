import { FC } from 'react';

import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { AnimationProps } from './types';

const MotionBox = motion(Box);

const Animation: FC<AnimationProps> = ({ children }) => {
	return (
		<MotionBox
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				duration: 1,
				ease: [0.76, 0, 0.24, 1]
			}}
			sx={{ width: '100%', height: '100%' }}
		>
			{children}
		</MotionBox>
	);
};

export default Animation;
