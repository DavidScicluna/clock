import { Timer, TimerTypesShort } from '../../../../common/types';

export type TimeLabelProps = {
	timerTypes: TimerTypesShort;
	timer: Partial<Timer>;
	isLive?: boolean;
};
