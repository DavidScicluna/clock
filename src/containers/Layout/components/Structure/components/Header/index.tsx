import { FC } from 'react';

import { useGetThemeAppearance, useTheme, utils } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import ColorPicker from './components/ColorPicker';
import Logo from './components/Logo';
import ToggleColorMode from './components/ToggleColorMode';

const { getColor } = utils;

const Header: FC = () => {
	const theme = useTheme();

	const { colorMode } = useGetThemeAppearance();

	return (
		<HStack
			width='100%'
			alignItems='center'
			justifyContent='space-between'
			borderWidth='0px'
			borderBottomWidth='2px'
			borderBottomStyle='solid'
			borderBottomColor={getColor({ theme, colorMode, type: 'divider' })}
			spacing={0}
			p={2}
		>
			<Logo />

			<HStack spacing={0}>
				<ColorPicker />
				<ToggleColorMode />
			</HStack>
		</HStack>
	);
};

export default Header;
