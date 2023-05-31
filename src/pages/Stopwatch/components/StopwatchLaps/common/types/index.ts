import { Timer } from '../../../../../../common/types';
import { Lap } from '../../components/StopwatchLap/common/types';

export type StopwatchLapsProps = {
	laps: Lap[];
	timer: Timer;
	hasLaps: boolean;
};
