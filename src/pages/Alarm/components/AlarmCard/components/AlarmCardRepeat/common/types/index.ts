import { Alarm } from '../../../../../../../../store/slices/Alarms/common/types';

export type AlarmCardRepeatProps = Pick<Alarm, 'repeat' | 'isActive'>;
