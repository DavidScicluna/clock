import { Timer } from '../../common/types';

type TimerKeys = keyof Timer;

export type TimeLabelProps = {
	timer: Timer;
	options?: Partial<{ [key in TimerKeys]: boolean }>;
};
