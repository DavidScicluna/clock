import { FC } from 'react';

import { useGetColor } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { TimePickerLabelNumberProps } from './common/types';

const TimePickerLabelNumber: FC<TimePickerLabelNumberProps> = ({ children }) => {
	const color = useGetColor({ color: 'gray', type: 'text.primary' });

	return (
		<Text align='center' color={color} fontSize={['8xl']} fontWeight='semibold' lineHeight='normal'>
			{children}
		</Text>
	);
};

export default TimePickerLabelNumber;
