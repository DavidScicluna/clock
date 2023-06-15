import memoize from 'micro-memoize';

import { Alarm } from '../../../../../../store/slices/Alarms/common/types';

export const getDeleteAlarmToastID = memoize((alarmID?: Alarm['id']): string => {
	if (alarmID) {
		return `ds-clock-delete-alarm-${alarmID}-toast`;
	} else {
		return `ds-clock-delete-alarm-toast`;
	}
});
