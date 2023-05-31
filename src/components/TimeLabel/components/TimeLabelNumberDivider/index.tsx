import { FC, useEffect } from 'react';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffectOnce } from 'usehooks-ts';

import { isLive as defaultIsLive } from '../../common/default/props';
import TimeLabelNumber from '../TimeLabelNumber';

import { TimeLabelNumberDividerProps } from './common/types';

const TimeLabelNumberDivider: FC<TimeLabelNumberDividerProps> = ({ timerTypes, isLive = defaultIsLive }) => {
	const controls = useAnimationControls();

	const handleControls = (): void => {
		if (isLive) {
			controls.start({ opacity: [1, 0, 1] }, { duration: 1, repeatDelay: 1, repeat: Infinity });
		} else {
			controls.set({ opacity: 1 });
			controls.stop();
		}
	};

	useEffect(() => handleControls(), [timerTypes, isLive]);

	useEffectOnce(() => controls.mount());

	return (
		<motion.div animate={controls}>
			<TimeLabelNumber lineHeight={1} timerTypes={timerTypes}>
				:
			</TimeLabelNumber>
		</motion.div>
	);
};

export default TimeLabelNumberDivider;
