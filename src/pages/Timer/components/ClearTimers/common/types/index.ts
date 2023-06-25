import { ReactNode } from 'react';

type ClearTimersRenderActionProps = {
	children: string;
	onClick: () => void;
};

export type ClearTimersProps = {
	renderAction: (props: ClearTimersRenderActionProps) => ReactNode;
};
