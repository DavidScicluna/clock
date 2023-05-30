import { FC } from 'react';

import { useGetColor } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { TimeLabelNumberProps } from './common/types';

const TimeLabelNumber: FC<TimeLabelNumberProps> = ({ children, ...rest }) => {
	const color = useGetColor({ color: 'gray', type: 'text.primary' });

	return (
		<Text {...rest} align='center' color={color} fontSize={['7xl', '8xl']} fontWeight='semibold'>
			{children}
		</Text>
	);
};

export default TimeLabelNumber;
