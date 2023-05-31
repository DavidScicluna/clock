import { Timer } from '../../../../../../common/types';

export type StopwatchControlsProps = {
	hasStarted: boolean;
	timer: Timer;
	onReset: () => void;
	onStart: () => void;
	onPause: () => void;
	onSetLap: () => void;
};
