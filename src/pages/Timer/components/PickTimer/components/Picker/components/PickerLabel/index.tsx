import { FC } from 'react';

import { useGetThemeAppearance, useTheme, utils } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { PickerLabelProps } from './common/types';

const { getColor } = utils;

const PickerLabel: FC<PickerLabelProps> = ({ children }) => {
	const theme = useTheme();

	const { colorMode } = useGetThemeAppearance();

	return (
		<Text
			align='center'
			color={getColor({ theme, colorMode, type: 'text.primary' })}
			fontSize='8xl'
			fontFamily='mono'
			userSelect='none'
		>
			{children}
		</Text>
	);
};

export default PickerLabel;
