import { ReactNode } from 'react';

import { Timer } from '../../../../../../store/slices/Timers/common/types';

type DeleteTimerRenderActionProps = {
	children: string;
	onClick: (timer: Timer) => void;
};

export type DeleteTimerProps = {
	renderAction: (props: DeleteTimerRenderActionProps) => ReactNode;
};
