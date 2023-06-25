import { AlertStatus } from '@chakra-ui/react';

import memoize from 'micro-memoize';

import { Timer } from '../../../../../../store/slices/Timers/common/types';

type GetDeleteTimerToastIDProps = { timerID?: Timer['id']; type: AlertStatus };

export const getDeleteTimerToastID = memoize(({ timerID, type }: GetDeleteTimerToastIDProps): string => {
	if (timerID) {
		return `ds-clock-delete-timer-${timerID}-${type}-toast`;
	} else {
		return `ds-clock-delete-timer-${type}-toast`;
	}
});
