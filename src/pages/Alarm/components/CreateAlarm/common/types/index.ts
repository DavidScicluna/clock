import { ReactNode } from 'react';

import { Alarm } from '../../../../../../store/slices/Alarms/common/types';

export type CreateAlarmTimeForm = Pick<Alarm, 'time'>;
export type CreateAlarmDetailsForm = Pick<Alarm, 'label' | 'repeat' | 'hasSnooze'>;

type CreateAlarmRenderActionProps = {
	children: string;
	onClick: () => void;
};

export type CreateAlarmProps = {
	renderAction: (props: CreateAlarmRenderActionProps) => ReactNode;
};
