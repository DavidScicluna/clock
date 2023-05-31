import { FC } from 'react';

import { useGetColor } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { TimeLabelCaptionProps } from './common/types';

const TimeLabelCaption: FC<TimeLabelCaptionProps> = ({ children, ...rest }) => {
	const color = useGetColor({ color: 'gray', type: 'text.secondary' });

	return (
		<Text
			{...rest}
			align='center'
			color={color}
			fontSize={['sm', 'md', 'lg', 'xl']}
			fontWeight='bold'
			lineHeight='normal'
			textTransform='uppercase'
		>
			{children}
		</Text>
	);
};

export default TimeLabelCaption;
