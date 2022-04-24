import { FC } from 'react';

import Error from '../Error';

// TODO: Update these values with theme object from redux
const color = 'blue';
const colorMode = 'light';

const NoMatch: FC = () => {
	return (
		<Error
			color={color}
			colorMode={colorMode}
			code={404}
			title='Page not found!'
			subtitle='Please check the URL in the address bar and try again.'
		/>
	);
};

export default NoMatch;
