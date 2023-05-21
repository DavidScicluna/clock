import { scripts, Undefinable } from '@davidscicluna/component-library';

import { capitalize, memoize } from 'lodash';

import tabs, { alarmTabIndex, stopwatchTabIndex, Tab, timerTabIndex, worldClockTabIndex } from '../data/tabs';

const { memoizeDebounce } = scripts;

type GetActiveTabIndexFromPathnameReturn = 0 | 1 | 2 | 3;

export const getActiveTabIndexFromPathname = memoize((pathname: string): GetActiveTabIndexFromPathnameReturn => {
	const path = pathname.replace('/', '');

	switch (path) {
		case 'alarm':
			return alarmTabIndex;
		case 'stopwatch':
			return stopwatchTabIndex;
		case 'timer':
			return timerTabIndex;
		default:
			return worldClockTabIndex;
	}
});

type GetActiveTabFromIndexReturn = Undefinable<Tab>;

export const getActiveTabFromIndex = memoize((index: number): GetActiveTabFromIndexReturn => {
	const tab = tabs.find((_tab, i) => i === index);

	return tab;
});

type GetActiveTabFromPathnameReturn = Undefinable<Tab>;

export const getActiveTabFromPathname = memoize((pathname: string): GetActiveTabFromPathnameReturn => {
	const tab = tabs.find(({ path }) => path === pathname);

	return tab;
});

export const updateDocumentMeta = memoizeDebounce((tab: Tab) => {
	localStorage.setItem('ds-clock-page-icon', tab.icon);
	document.title = capitalize(tab.label);

	window.dispatchEvent(new Event('storage'));
}, 1000);
