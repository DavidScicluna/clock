import { AppColor, AppFullColorMode, defaults } from '@davidscicluna/component-library';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sample } from 'lodash';

import colors from '../../../common/data/colors';
import { timeFormat as defaultTimeFormat } from '../../../common/data/props';
import { TimeFormat } from '../../../common/types';

import { AppStateProps, AppTheme } from './common/types';

const { defaultColor, defaultColorMode } = defaults.props;

const initialState: AppStateProps = {
	data: {
		timeFormat: defaultTimeFormat
	},
	ui: {
		theme: {
			color: sample(colors) || defaultColor,
			colorMode: defaultColorMode
		}
	}
};

const appSlice = createSlice({
	name: 'app',
	initialState: { ...initialState },
	reducers: {
		setAppTimeFormat: (state: AppStateProps, action: PayloadAction<TimeFormat>) => {
			state.data.timeFormat = action.payload;
		},
		setAppColor: (state: AppStateProps, action: PayloadAction<AppColor>) => {
			state.ui.theme.color = action.payload;
		},
		setAppColorMode: (state: AppStateProps, action: PayloadAction<AppFullColorMode>) => {
			state.ui.theme.colorMode = action.payload;
		},
		setAppTheme: (state: AppStateProps, action: PayloadAction<AppTheme>) => {
			state.ui.theme = action.payload;
		}
	}
});

export const { setAppTimeFormat, setAppColor, setAppColorMode, setAppTheme } = appSlice.actions;

export default appSlice.reducer;
