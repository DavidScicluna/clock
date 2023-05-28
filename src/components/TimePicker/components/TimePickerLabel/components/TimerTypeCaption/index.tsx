import { FC } from 'react';

import { useGetColor } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { TimerTypeCaptionProps } from './common/types';

const TimerTypeCaption: FC<TimerTypeCaptionProps> = ({ children, ...rest }) => {
	const color = useGetColor({ color: 'gray', type: 'text.secondary' });

	return (
		<Text
			{...rest}
			align='center'
			color={color}
			fontSize={['xl']}
			fontWeight='bold'
			lineHeight='normal'
			textTransform='uppercase'
		>
			{children}
		</Text>
	);
};

export default TimerTypeCaption;
