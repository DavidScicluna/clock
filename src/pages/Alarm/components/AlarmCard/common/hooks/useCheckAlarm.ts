import { Nullable, useBoolean } from '@davidscicluna/component-library';

import dayjs from 'dayjs';
import { useInterval } from 'usehooks-ts';

import { WeekDayIndex } from '../../../../../../common/types';
import { getWeekDayValue } from '../../../../../../common/utils';
import { Alarm } from '../../../../../../store/slices/Alarms/common/types';

const timeout = 1000;

const getIntervalTimeout = ({ repeat = [], isActive }: Alarm): Nullable<number> => {
	if (repeat.length > 0) {
		const hasRepeat = repeat.some((day) => getWeekDayValue({ day }) === (dayjs(new Date()).day() as WeekDayIndex));
		return isActive && hasRepeat ? timeout : null;
	} else {
		return isActive ? timeout : null;
	}
};

const useCheckAlarm = (alarm: Alarm): boolean => {
	const [hasCompleted, setHasCompleted] = useBoolean();

	const { time } = alarm;

	const handleCheckIsComplete = (): void => {
		const today = dayjs(new Date());
		const hour = today.hour();
		const minute = today.minute();

		const { h, m } = time;

		if (h === hour && m === minute) {
			setHasCompleted.on();
		} else {
			setHasCompleted.off();
		}
	};

	useInterval(() => (!hasCompleted ? handleCheckIsComplete() : undefined), getIntervalTimeout(alarm));

	return hasCompleted;
};

export default useCheckAlarm;
