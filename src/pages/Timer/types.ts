import { Timer as FullTimer } from '../../common/types';

export type Status = 'pick' | 'start' | 'pause';

export type Timer = Omit<FullTimer, 'milliseconds'>;
