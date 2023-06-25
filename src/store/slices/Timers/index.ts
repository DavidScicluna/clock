import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uniqBy } from 'lodash';

import { Timer, Timers, TimersStateProps } from './common/types';

const initialState: TimersStateProps = {
	data: { timers: [] }
};

const timersSlice = createSlice({
	name: 'timers',
	initialState: { ...initialState },
	reducers: {
		setTimers: (state: TimersStateProps, action: PayloadAction<Timers>) => {
			state.data.timers = uniqBy([...action.payload], 'id');
		},
		setTimer: (state: TimersStateProps, action: PayloadAction<Timer>) => {
			state.data.timers = uniqBy(
				[
					...state.data.timers.map((timer) =>
						timer.id === action.payload.id ? { ...timer, ...action.payload } : timer
					)
				],
				'id'
			);
		}
	}
});

export const { setTimers, setTimer } = timersSlice.actions;

export default timersSlice.reducer;
