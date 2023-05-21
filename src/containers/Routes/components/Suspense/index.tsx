import { FC } from 'react';

import { Button, Suspense as DSCLSuspense } from '@davidscicluna/component-library';

import Error from '../../../Error';

import { SuspenseProps } from './common/types';

const Suspense: FC<SuspenseProps> = ({ children, fallback }) => {
	return (
		<DSCLSuspense
			fallback={fallback}
			renderError={
				<Error
					code={404}
					title='Oh no! 😭'
					subtitle='Unfortunately, something went wrong when trying to render the application. Please refresh to try again!'
					renderActions={(props) => (
						<Button
							{...props}
							// isFullWidth={isSm}
							onClick={() => window.location.reload()}
						>
							Refresh
						</Button>
					)}
				/>
			}
		>
			{children}
		</DSCLSuspense>
	);
};

export default Suspense;
