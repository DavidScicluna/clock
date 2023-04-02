import { FC } from 'react';

import { Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { ActionsProps } from './types';

const Actions: FC<ActionsProps> = ({ color, colorMode, size }) => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	return (
		<Button
			color={color}
			colorMode={colorMode}
			isFullWidth={isSm}
			onClick={() => window.location.reload()}
			size={size}
		>
			Refresh
		</Button>
	);
};

export default Actions;
