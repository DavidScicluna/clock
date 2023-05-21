import { AppColor, AppFullColorMode } from '@davidscicluna/component-library';

export type AppTheme = {
	color: AppColor;
	colorMode: AppFullColorMode;
};

export type AppStateProps = {
	ui: {
		theme: AppTheme;
	};
};
