import { Timer } from '../../../../../../../../store/slices/Timers/common/types';

export type TimerCardDateProps = Pick<Timer, 'status'> & {
	elapsed: number;
};
