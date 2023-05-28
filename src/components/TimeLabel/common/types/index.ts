import { Timer, TimerTypeFull } from '../../../../common/types';

export type TimeLabelProps = {
	timer: Timer;
	options?: Partial<{ [key in TimerTypeFull]: boolean }>;
};
