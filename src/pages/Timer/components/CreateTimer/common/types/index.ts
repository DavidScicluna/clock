import { ReactNode } from 'react';

import { Timer } from '../../../../../../store/slices/Timers/common/types';

export type CreateTimerForm = Pick<Timer, 'label' | 'time' | 'isRepeatable'>;

type CreateTimerRenderActionProps = {
	children: string;
	onClick: () => void;
};

export type CreateTimerProps = {
	renderAction: (props: CreateTimerRenderActionProps) => ReactNode;
};
