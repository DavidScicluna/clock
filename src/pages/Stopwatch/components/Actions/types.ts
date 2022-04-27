import { Timer } from '../../../../common/types';

export type ActionsProps = {
	hasStarted: boolean;
	timer: Timer;
	onReset: () => void;
	onStartPause: () => void;
	onSetLap: () => void;
};
