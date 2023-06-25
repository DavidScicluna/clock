import { sort } from 'fast-sort';
import memoize from 'micro-memoize';

import { Timers } from '../../../../../../store/slices/Timers/common/types';
import { TimerGroups } from '../types';

export const getGroups = memoize((timers: Timers): TimerGroups => {
	let groups: TimerGroups = [
		{ id: 'all', label: 'All', timers: [], order: 0 },
		{ id: 'started', label: 'Started', timers: [], order: 1 },
		{ id: 'paused', label: 'Paused', timers: [], order: 2 },
		{ id: 'completed', label: 'Completed', timers: [], order: 3 }
	];

	timers.forEach((timer) => {
		const { status } = timer;
		if (status === 'started') {
			groups = groups.map((group) =>
				group.id === 'started' ? { ...group, timers: [...group.timers, timer] } : group
			);
		} else if (status === 'paused') {
			groups = groups.map((group) =>
				group.id === 'paused' ? { ...group, timers: [...group.timers, timer] } : group
			);
		} else {
			groups = groups.map((group) =>
				group.id === 'completed' ? { ...group, timers: [...group.timers, timer] } : group
			);
		}

		groups = groups.map((group) => (group.id === 'all' ? { ...group, timers: [...group.timers, timer] } : group));
	});

	return sort([...groups]).asc(({ order }) => order);
});
