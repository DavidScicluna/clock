import dayjs from 'dayjs';

import { CreateAlarmDetailsForm, CreateAlarmTimeForm } from '../types';

export const getTimerFormDefaultValues = (): CreateAlarmTimeForm => {
	const today = dayjs(new Date());

	const defaultValues: CreateAlarmTimeForm = { time: { hr: today.hour(), min: today.minute() } };

	return { ...defaultValues };
};

export const getDetailsFormDefaultValues = (alarms = 0): CreateAlarmDetailsForm => {
	return {
		label: `Alarm ${alarms + 1}`,
		repeat: [],
		hasSnooze: true
	};
};
