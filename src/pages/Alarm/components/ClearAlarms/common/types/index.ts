import { ReactNode } from 'react';

type ClearAlarmsRenderActionProps = {
	children: string;
	onClick: () => void;
};

export type ClearAlarmsProps = {
	renderAction: (props: ClearAlarmsRenderActionProps) => ReactNode;
};
