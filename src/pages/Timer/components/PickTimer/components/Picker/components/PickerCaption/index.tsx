import { FC } from 'react';

import { useGetThemeAppearance, useTheme, utils } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { PickerCaptionProps } from './common/types';

const { getColor } = utils;

const PickerCaption: FC<PickerCaptionProps> = ({ children }) => {
	const theme = useTheme();

	const { colorMode } = useGetThemeAppearance();

	return (
		<Text
			align='center'
			color={getColor({ theme, colorMode, type: 'text.secondary' })}
			fontSize='xl'
			fontWeight='semibold'
			textTransform='uppercase'
			whiteSpace='nowrap'
			userSelect='none'
		>
			{children}
		</Text>
	);
};

export default PickerCaption;
