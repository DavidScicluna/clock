import { WeekDayIndex } from '../../../../../../../../../../common/types';
import { AlarmCardRepeatProps } from '../../../../common/types';

export type AlarmCardRepeatDayProps = Pick<AlarmCardRepeatProps, 'isActive'> & {
	day: WeekDayIndex;
};
