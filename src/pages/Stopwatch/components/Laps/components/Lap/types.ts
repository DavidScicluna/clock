import { Timer } from '../../../../../../common/types';

type LapStatus = 'fastest' | 'slowest' | 'default';

export type Lap = {
	id: string;
	index: number;
	status: LapStatus;
} & Timer;

type Omitted = 'id';

export type LapProps = Omit<Lap, Omitted>;
