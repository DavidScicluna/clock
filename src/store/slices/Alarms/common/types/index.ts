import { PickFrom } from '@davidscicluna/component-library';

import { TimerTypeShort, WeekDayIndex } from '../../../../../common/types';

export type AlarmTime = Record<PickFrom<TimerTypeShort, 'h' | 'm'>, number>;
export type AlarmRepeat = WeekDayIndex[]; // Mon - Sun | 0 - 6

export type Alarm = {
	id: string;
	label: string;
	time: AlarmTime;
	repeat?: AlarmRepeat;
	// sound:
	hasSnooze: boolean;
	isActive: boolean;
};
export type Alarms = Alarm[];

export type AlarmsStateProps = {
	data: {
		alarms: Alarms;
	};
};
