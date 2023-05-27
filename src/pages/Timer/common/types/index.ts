import { Timer as FullTimer } from '../../../../common/types';

export type Status = 'picker' | 'start' | 'pause';

export type Timer = Omit<FullTimer, 'milliseconds'>;
