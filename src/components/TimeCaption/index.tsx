import { forwardRef, ReactElement } from 'react';

import { useGetColor } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { formatTimeType } from '../../common/utils';

import { TimeCaptionProps, TimeCaptionRef } from './common/types';

const TimeCaption = forwardRef<TimeCaptionRef, TimeCaptionProps>(function TimeCaption(props, ref): ReactElement {
	const { timeType, ...rest } = props;

	const color = useGetColor({ color: 'gray', type: 'text.secondary' });

	return (
		<Text
			ref={ref}
			align='center'
			color={color}
			fontSize={['sm', 'md', 'lg', 'xl']}
			fontWeight='bold'
			lineHeight='normal'
			textTransform='uppercase'
			{...rest}
		>
			{formatTimeType({ timeType, format: 'short' })}
		</Text>
	);
});

export default TimeCaption;
