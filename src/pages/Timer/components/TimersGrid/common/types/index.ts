import { Timers } from '../../../../../../store/slices/Timers/common/types';

export type TimerGroup = {
	readonly id: 'all' | 'started' | 'paused' | 'completed';
	readonly label: 'All' | 'Started' | 'Paused' | 'Completed';
	timers: Timers;
	readonly order: number;
};
export type TimerGroups = TimerGroup[];
