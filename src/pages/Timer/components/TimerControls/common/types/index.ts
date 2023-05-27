import { Status, Timer } from '../../../../common/types';

export type TimerControlsProps = {
	status: Status;
	pickedTimer: Timer;
	onClear: () => void;
	onReset: () => void;
	onResumePause: () => void;
	onStart: () => void;
};
