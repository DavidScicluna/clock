import { FC } from 'react';

import { useGetColor } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { TimePickerLabelNumberProps } from './common/types';

const TimePickerLabelNumber: FC<TimePickerLabelNumberProps> = ({ children, ...rest }) => {
	const color = useGetColor({ color: 'gray', type: 'text.primary' });

	return (
		<Text {...rest} align='center' color={color} fontSize={['7xl', '8xl']} fontWeight='semibold'>
			{children}
		</Text>
	);
};

export default TimePickerLabelNumber;
