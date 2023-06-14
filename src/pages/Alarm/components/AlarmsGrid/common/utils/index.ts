import { sort } from 'fast-sort';
import memoize from 'micro-memoize';

import { Alarms } from '../../../../../../store/slices/Alarms/common/types';
import { AlarmGroups } from '../types';

export const getGroups = memoize((alarms: Alarms): AlarmGroups => {
	let groups: AlarmGroups = [
		{ id: 'all', label: 'All', alarms: [], order: 0 },
		{ id: 'active', label: 'Active', alarms: [], order: 1 },
		{ id: 'inactive', label: 'Inactive', alarms: [], order: 2 }
	];

	alarms.forEach((alarm) => {
		if (alarm.isActive) {
			groups = groups.map((group) =>
				group.id === 'active' ? { ...group, alarms: [...group.alarms, alarm] } : group
			);
		} else {
			groups = groups.map((group) =>
				group.id === 'inactive' ? { ...group, alarms: [...group.alarms, alarm] } : group
			);
		}

		groups = groups.map((group) => (group.id === 'all' ? { ...group, alarms: [...group.alarms, alarm] } : group));
	});

	return sort([...groups]).asc(({ order }) => order);
});
