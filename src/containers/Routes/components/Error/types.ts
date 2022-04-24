import { ReactElement } from 'react';

import { ButtonProps } from '@davidscicluna/component-library';

export type DescriptionRef = HTMLDivElement | null;

export type RenderActionsProps = {
	color: ButtonProps['color'];
	colorMode: ButtonProps['colorMode'];
	size: ButtonProps['size'];
};

export type ErrorProps = {
	color: ButtonProps['color'];
	colorMode: ButtonProps['colorMode'];
	code: number;
	title: string;
	subtitle: string;
	renderActions?: ({ color, colorMode, size }: RenderActionsProps) => ReactElement;
};
