import { ReactNode } from 'react';

import { Alarm } from '../../../../../../store/slices/Alarms/common/types';

export type EditAlarmTimeForm = Pick<Alarm, 'time'>;
export type EditAlarmDetailsForm = Pick<Alarm, 'label' | 'repeat' | 'hasSnooze'>;

type EditAlarmRenderActionProps = {
	children: string;
	onClick: (alarm: Alarm) => void;
};

export type EditAlarmProps = {
	renderAction: (props: EditAlarmRenderActionProps) => ReactNode;
};
