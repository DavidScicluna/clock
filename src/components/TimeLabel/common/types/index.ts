import { Timer, TimerTypeShort } from '../../../../common/types';

export type TimeLabelProps = {
	types: TimerTypeShort[];
	timer: Partial<Timer>;
};
