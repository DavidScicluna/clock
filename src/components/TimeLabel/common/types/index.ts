import { Timer } from '../../../../common/types';

export type TimeLabelProps = {
	timer: Timer;
	options?: Partial<{ [key in keyof Timer]: boolean }>;
};
