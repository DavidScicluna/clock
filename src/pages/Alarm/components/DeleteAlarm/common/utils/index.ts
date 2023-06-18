import { AlertStatus } from '@chakra-ui/react';

import memoize from 'micro-memoize';

import { Alarm } from '../../../../../../store/slices/Alarms/common/types';

type GetDeleteAlarmToastIDProps = { alarmID?: Alarm['id']; type: AlertStatus };

export const getDeleteAlarmToastID = memoize(({ alarmID, type }: GetDeleteAlarmToastIDProps): string => {
	if (alarmID) {
		return `ds-clock-delete-alarm-${alarmID}-${type}-toast`;
	} else {
		return `ds-clock-delete-alarm-${type}-toast`;
	}
});
