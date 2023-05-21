import { IconType } from '@davidscicluna/component-library';

export const worldClockTabIndex = 0;
export const alarmTabIndex = 1;
export const stopwatchTabIndex = 2;
export const timerTabIndex = 3;

export type Tab = {
	icon: IconType;
	label: string;
	path: string;
};
export type Tabs = Tab[];

const navItems: Tabs = [
	{
		icon: 'language',
		label: 'World Clock',
		path: '/'
	},
	{
		icon: 'alarm',
		label: 'Alarm',
		path: '/alarm'
	},
	{
		icon: 'timer',
		label: 'Stopwatch',
		path: '/stopwatch'
	},
	{
		icon: 'hourglass_empty',
		label: 'Timer',
		path: '/timer'
	}
];

export default navItems;
