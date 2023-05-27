import { Status } from '../../../../common/types';

export type TimerProgressProps = {
	status: Status;
	elapsed: number;
	total: number;
};
