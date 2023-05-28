import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { Text, useColorMode, VStack } from '@chakra-ui/react';

import { LabelProps } from './common/types';

const { getColor } = utils;

const Label: FC<LabelProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const { caption, captionSize = 'xs', value, valueSize = '4xl' } = props;

	return (
		<VStack alignItems='center' justifyContent='center' spacing={0}>
			<Text
				align='center'
				color={getColor({ theme, colorMode, type: 'text.secondary' })}
				fontSize={captionSize}
				fontWeight='medium'
				textTransform='uppercase'
				whiteSpace='nowrap'
				userSelect='none'
				visibility={caption ? 'visible' : 'hidden'}
			>
				{caption || ':'}
			</Text>

			<Text
				align='center'
				color={getColor({ theme, colorMode, type: 'text.primary' })}
				fontSize={valueSize}
				fontFamily='mono'
				userSelect='none'
			>
				{typeof value === 'number' ? String(value).padStart(2, '0') : value}
			</Text>
		</VStack>
	);
};

export default Label;
