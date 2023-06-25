import { AlertStatus } from '@chakra-ui/react';

import memoize from 'micro-memoize';

type GetClearTimerToastIDProps = { timers: number; type: AlertStatus };

export const getClearTimersToastID = memoize(({ timers, type }: GetClearTimerToastIDProps): string => {
	return `ds-clock-clear-${timers}-timers-${type}-toast`;
});
