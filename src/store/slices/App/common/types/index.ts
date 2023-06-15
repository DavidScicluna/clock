import { AppColor, AppFullColorMode } from '@davidscicluna/component-library';

import { TimeFormat } from '../../../../../common/types';

export type AppTheme = {
	color: AppColor;
	colorMode: AppFullColorMode;
};

export type AppStateProps = {
	data: {
		timeFormat: TimeFormat;
	};
	ui: {
		theme: AppTheme;
	};
};
