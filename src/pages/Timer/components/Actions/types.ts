import { Timer } from '../../../../common/types';
import { Status } from '../../types';

export type ActionsProps = {
	status: Status;
	pickedTimer: Omit<Timer, 'milliseconds'>;
	onClear: () => void;
	onReset: () => void;
	onResumePause: () => void;
	onStart: () => void;
};
