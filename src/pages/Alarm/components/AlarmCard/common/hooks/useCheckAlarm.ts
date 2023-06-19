import { Nullable, useBoolean } from '@davidscicluna/component-library';

import dayjs from 'dayjs';
import { useInterval } from 'usehooks-ts';

import { WeekDayIndex } from '../../../../../../common/types';
import { getWeekDayValue } from '../../../../../../common/utils';
import { Alarm } from '../../../../../../store/slices/Alarms/common/types';

const timeout = 1000;

type GetIntervalTimeoutProps = Alarm & { hasCompleted: boolean };

const getIntervalTimeout = ({ repeat = [], isActive, hasCompleted }: GetIntervalTimeoutProps): Nullable<number> => {
	if (repeat.length > 0) {
		const hasRepeat = repeat.some((day) => getWeekDayValue({ day }) === (dayjs(new Date()).day() as WeekDayIndex));
		return !hasCompleted && isActive && hasRepeat ? timeout : null;
	} else {
		return !hasCompleted && isActive ? timeout : null;
	}
};

const useCheckAlarm = (alarm: Alarm): boolean => {
	const [hasCompleted, setHasCompleted] = useBoolean();

	const { time } = alarm;

	const handleCheckIsComplete = (): void => {
		const today = dayjs(new Date());
		const hour = today.hour();
		const minute = today.minute();

		const { hr, min } = time;

		if (hr === hour && min === minute) {
			setHasCompleted.on();
		} else {
			setHasCompleted.off();
		}
	};

	useInterval(() => handleCheckIsComplete(), getIntervalTimeout({ ...alarm, hasCompleted }));

	return hasCompleted;
};

export default useCheckAlarm;
