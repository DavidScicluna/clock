import { useEffect } from 'react';

import { AnimationControls, useAnimationControls } from 'framer-motion';
import { useEffectOnce } from 'usehooks-ts';

const useIsLive = (isLive: boolean): AnimationControls => {
	const controls = useAnimationControls();

	const handleControls = (): void => {
		if (isLive) {
			controls.start({ opacity: [1, 0, 1] }, { duration: 0.5, repeatDelay: 1.5, repeat: Infinity });
		} else {
			controls.set({ opacity: 1 });
			controls.stop();
		}
	};

	useEffect(() => handleControls(), [isLive]);

	useEffectOnce(() => controls.mount());

	return controls;
};

export default useIsLive;
