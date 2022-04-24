import { FC, Suspense as RSuspense } from 'react';

import { Box } from '@chakra-ui/react';

import ErrorBoundary from './components/ErrorBoundary';
import { SuspenseProps } from './types';

// TODO: Add Fallback
// TODO: Update these values with theme object from redux
const color = 'blue';
const colorMode = 'light';

const Suspense: FC<SuspenseProps> = ({ children }) => {
	return (
		<ErrorBoundary color={color} colorMode={colorMode}>
			<RSuspense fallback={<Box />}>{children}</RSuspense>
		</ErrorBoundary>
	);
};

export default Suspense;
