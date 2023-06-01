import { Timer } from '../../../../common/types';

type LapStatus = 'fastest' | 'slowest' | 'default';

export type StopwatchLap = Timer & {
	id: string;
	index: number;
	status: LapStatus;
};
export type StopwatchLaps = StopwatchLap[];
