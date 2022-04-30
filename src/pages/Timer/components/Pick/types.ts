import { Timer } from '../../../../common/types';

type Omitted = 'milliseconds';

type PickTimer = Omit<Timer, Omitted>;

export type PickType = keyof PickTimer;

export type PickProps = {
	onItemClick: (type: PickType, num: number) => void;
} & PickTimer;
