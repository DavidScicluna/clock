import { Alarms } from '../../../../../../store/slices/Alarms/common/types';

export type AlarmGroup = {
	readonly id: 'all' | 'active' | 'inactive';
	readonly label: 'All' | 'Active' | 'Inactive';
	alarms: Alarms;
	readonly order: number;
};
export type AlarmGroups = AlarmGroup[];
