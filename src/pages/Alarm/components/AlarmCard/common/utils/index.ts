import memoize from 'micro-memoize';

import { Alarm } from '../../../../../../store/slices/Alarms/common/types';

export const getAlarmToastID = memoize((alarmID: Alarm['id']): string => {
	return `ds-clock-alarm-${alarmID}-toast`;
});
