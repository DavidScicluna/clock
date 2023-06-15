import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uniqBy } from 'lodash';

import { Alarm, Alarms, AlarmsStateProps } from './common/types';

const initialState: AlarmsStateProps = {
	data: { alarms: [] }
};

const alarmsSlice = createSlice({
	name: 'alarms',
	initialState: { ...initialState },
	reducers: {
		setAlarms: (state: AlarmsStateProps, action: PayloadAction<Alarms>) => {
			state.data.alarms = uniqBy([...action.payload], 'id');
		},
		setAlarm: (state: AlarmsStateProps, action: PayloadAction<Alarm>) => {
			state.data.alarms = uniqBy(
				[
					...state.data.alarms.map((alarm) =>
						alarm.id === action.payload.id ? { ...alarm, ...action.payload } : alarm
					)
				],
				'id'
			);
		}
	}
});

export const { setAlarms, setAlarm } = alarmsSlice.actions;

export default alarmsSlice.reducer;
