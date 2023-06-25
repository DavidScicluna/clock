import { ReactNode } from 'react';

import { Timer } from '../../../../../../store/slices/Timers/common/types';

export type EditTimerForm = Pick<Timer, 'label' | 'time' | 'isRepeatable'>;

type EditTimerRenderActionProps = {
	children: string;
	onClick: (timer: Timer) => void;
};

export type EditTimerProps = {
	renderAction: (props: EditTimerRenderActionProps) => ReactNode;
};
