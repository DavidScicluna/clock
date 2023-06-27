import { FC } from 'react';

import { useGetColor } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { TimeTextProps } from './common/types';

const TimeText: FC<TimeTextProps> = ({ children, ...rest }) => {
	const color = useGetColor({ color: 'gray', type: 'text.primary' });

	return (
		<Text align='center' color={color} fontWeight='black' lineHeight={1} {...rest}>
			{children}
		</Text>
	);
};

export default TimeText;
