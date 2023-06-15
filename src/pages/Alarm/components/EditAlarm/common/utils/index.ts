import dayjs from 'dayjs';

import { Alarm } from '../../../../../../store/slices/Alarms/common/types';
import { EditAlarmDetailsForm, EditAlarmTimeForm } from '../types';

export const getTimerFormDefaultValues = (alarm?: Alarm): EditAlarmTimeForm => {
	const today = dayjs(new Date());

	const defaultValues: EditAlarmTimeForm = { time: { h: today.hour(), m: today.minute() } };

	if (alarm) {
		const { time } = alarm;
		return { ...defaultValues, time };
	} else {
		return { ...defaultValues };
	}
};

export const getDetailsFormDefaultValues = (alarm?: Alarm): EditAlarmDetailsForm => {
	const defaultValues: EditAlarmDetailsForm = { label: 'Alarm', repeat: [], hasSnooze: true };

	if (alarm) {
		const { label, repeat, hasSnooze } = alarm;
		return { ...defaultValues, label, repeat, hasSnooze };
	} else {
		return { ...defaultValues };
	}
};
