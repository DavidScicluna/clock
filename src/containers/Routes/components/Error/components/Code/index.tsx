import { FC } from 'react';

import { Text } from '@chakra-ui/react';

import { CodeProps } from './types';

const Code: FC<CodeProps> = ({ color, colorMode, code }) => {
	return (
		<Text
			align='right'
			color={`${color}.${colorMode === 'light' ? 500 : 400}`}
			fontSize='8xl'
			fontWeight='extrabold'
			lineHeight='normal'
		>
			{code}
		</Text>
	);
};

export default Code;
