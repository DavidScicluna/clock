import dayjs from 'dayjs';

import { CreateAlarmDetailsForm, CreateAlarmTimeForm } from '../types';

export const getTimerFormDefaultValues = (): CreateAlarmTimeForm => {
	const today = dayjs(new Date());

	const defaultValues: CreateAlarmTimeForm = { time: { h: today.hour(), m: today.minute() } };

	return { ...defaultValues };
};

export const getDetailsFormDefaultValues = (): CreateAlarmDetailsForm => {
	return {
		label: 'Alarm',
		repeat: [],
		hasSnooze: true
	};
};
