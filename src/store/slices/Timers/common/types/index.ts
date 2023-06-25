import { PickFrom } from '@davidscicluna/component-library';

import { TimerTypeShort } from '../../../../../common/types';

export type TimerTime = Record<PickFrom<TimerTypeShort, 'hr' | 'min' | 'sec'>, number>;
export type TimerStatus = 'started' | 'paused' | 'completed';

export type Timer = {
	readonly id: string;
	label: string;
	time: TimerTime;
	readonly fixedTime: TimerTime;
	isRepeatable?: boolean;
	status: TimerStatus;
};
export type Timers = Timer[];

export type TimersStateProps = {
	data: {
		timers: Timers;
	};
};
