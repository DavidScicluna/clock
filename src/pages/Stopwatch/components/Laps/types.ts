import { Timer } from '../../../../common/types';

import { Lap } from './components/Lap/types';

export type LapsProps = {
	laps: Lap[];
	timer: Timer;
};
