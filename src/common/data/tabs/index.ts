import { IconCategory, IconType, Readonly } from '@davidscicluna/component-library';

export const worldClockTabIndex = 0;
export const alarmTabIndex = 1;
export const stopwatchTabIndex = 2;
export const timerTabIndex = 3;

export type TabID = 'world_clock' | 'alarm' | 'stopwatch' | 'timer';

export type Tab = Readonly<{
	id: TabID;
	icon: IconType;
	category: IconCategory;
	label: string;
	path: string;
}>;
export type Tabs = Tab[];

const tabs: Tabs = [
	{
		id: 'world_clock',
		icon: 'language',
		category: 'outlined',
		label: 'World Clock',
		path: '/'
	},
	{
		id: 'alarm',
		icon: 'alarm',
		category: 'outlined',
		label: 'Alarm',
		path: '/alarm'
	},
	{
		id: 'stopwatch',
		icon: 'timer',
		category: 'outlined',
		label: 'Stopwatch',
		path: '/stopwatch'
	},
	{
		id: 'timer',
		icon: 'hourglass_empty',
		category: 'outlined',
		label: 'Timer',
		path: '/timer'
	}
];

export default tabs;
