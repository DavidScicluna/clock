import { ReactNode } from 'react';

import { Alarm } from '../../../../../../store/slices/Alarms/common/types';

type DeleteAlarmRenderActionProps = {
	children: string;
	onClick: (alarm: Alarm) => void;
};

export type DeleteAlarmProps = {
	renderAction: (props: DeleteAlarmRenderActionProps) => ReactNode;
};
