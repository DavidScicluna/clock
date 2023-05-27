import { Timer } from '../../../../types';

type PickTimer = Omit<Timer, 'milliseconds'>;

export type PickTimerOnPickProps = { type: keyof PickTimer; num: number };

export type PickTimerProps = PickTimer & {
	onPick: (props: PickTimerOnPickProps) => void;
};
