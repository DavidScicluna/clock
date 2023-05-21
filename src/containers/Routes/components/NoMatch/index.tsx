import { FC } from 'react';

import { Button } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import Error from '../../../Error';

const NoMatch: FC = () => {
	return (
		<Error
			code={404}
			title='Page not found!'
			subtitle='Please check the URL in the address bar and try again.'
			renderActions={(props) => (
				<HStack>
					{/* <InternalLink to='/' isFullWidth={isSm}>
						<Button {...props} isFullWidth variant='outlined'>
							Go back home
						</Button>
					</InternalLink> */}

					<Button
						{...props}
						// isFullWidth={isSm}
						onClick={() => window.location.reload()}
					>
						Try again
					</Button>
				</HStack>
			)}
		/>
	);
};

export default NoMatch;
