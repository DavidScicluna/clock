import { Timer } from '../../../../../../../../common/types';

type LapStatus = 'fastest' | 'slowest' | 'default';

export type Lap = {
	id: string;
	index: number;
	status: LapStatus;
	isCurrent?: boolean;
} & Timer;

type Omitted = 'id';

export type StopwatchLapProps = Omit<Lap, Omitted>;
