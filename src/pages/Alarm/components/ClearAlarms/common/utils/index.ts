import { AlertStatus } from '@chakra-ui/react';

import memoize from 'micro-memoize';

type GetClearAlarmToastIDProps = { alarms: number; type: AlertStatus };

export const getClearAlarmsToastID = memoize(({ alarms, type }: GetClearAlarmToastIDProps): string => {
	return `ds-clock-clear-${alarms}-alarms-${type}-toast`;
});
