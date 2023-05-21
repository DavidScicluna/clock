import { AppColor, AppColors, AppFullColorMode, defaults } from '@davidscicluna/component-library';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sample } from 'lodash';

import { AppStateProps, AppTheme } from './common/types';

const { defaultColor, defaultColorMode } = defaults.props;

const colors: AppColors = [
	'red',
	'pink',
	'purple',
	'deep_purple',
	'indigo',
	'blue',
	'light_blue',
	'cyan',
	'teal',
	'green',
	'light_green',
	'lime',
	'yellow',
	'orange',
	'deep_orange'
];

const initialState: AppStateProps = {
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

export const { setAppColor, setAppColorMode, setAppTheme } = appSlice.actions;

export default appSlice.reducer;
