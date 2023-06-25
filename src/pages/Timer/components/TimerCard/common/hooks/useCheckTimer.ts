import { useBoolean } from '@davidscicluna/component-library';

import { useInterval } from 'usehooks-ts';

import { Timer } from '../../../../../../store/slices/Timers/common/types';

type UseCheckTimerProps = { timer: Timer; elapsed: number; onComplete: () => void };

const timeout = 1000;

const useCheckTimer = ({ timer, elapsed, onComplete }: UseCheckTimerProps): boolean => {
	const { status } = timer;

	const [hasCompleted, setHasCompleted] = useBoolean(elapsed === 0);

	const handleCheckIsComplete = (): void => {
		if (elapsed === 0) {
			onComplete();
			setHasCompleted.on();
		} else {
			setHasCompleted.off();
		}
	};

	useInterval(() => handleCheckIsComplete(), !hasCompleted && status === 'started' ? timeout : null);

	return hasCompleted;
};

export default useCheckTimer;
