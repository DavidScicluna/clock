import { AlertStatus } from '@davidscicluna/component-library';

import memoize from 'micro-memoize';

import { Alarm } from '../../../../../../store/slices/Alarms/common/types';

type GetAlarmToastIDProps = { alarmID: Alarm['id']; type: AlertStatus };

export const getAlarmToastID = memoize(({ alarmID, type }: GetAlarmToastIDProps): string => {
	return `ds-clock-alarm-${alarmID}-${type}-toast`;
});
