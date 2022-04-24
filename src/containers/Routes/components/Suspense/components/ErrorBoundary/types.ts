import { ReactNode } from 'react';

import { ErrorProps } from '../../../Error/types';

export type State = {
	hasError: boolean;
};

export type ErrorBoundaryProps = {
	children: ReactNode;
	color: ErrorProps['color'];
	colorMode: ErrorProps['colorMode'];
};
