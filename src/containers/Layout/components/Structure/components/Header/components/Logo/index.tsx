import { FC, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { Icon, useDSCLProviderContext, useTheme, utils } from '@davidscicluna/component-library';

import { HStack, Text } from '@chakra-ui/react';

import { getActiveTabFromPathname } from '../../../../common/utils';
const { getColor } = utils;

const Logo: FC = () => {
	const theme = useTheme();

	const { color, colorMode } = useDSCLProviderContext();

	const location = useLocation();

	const tab = useMemo(() => {
		return getActiveTabFromPathname(location.pathname);
	}, [location.pathname]);

	return (
		<HStack>
			<Icon
				color={color}
				width='auto'
				height='auto'
				fontSize={theme.fontSizes['2xl']}
				borderRadius='base'
				icon={tab && tab.icon ? tab.icon : 'schedule'}
				p={0.5}
				variant='contained'
			/>
			<Text
				color={getColor({ theme, colorMode, type: 'text.primary' })}
				fontSize='xl'
				fontWeight='bold'
				textTransform='capitalize'
			>
				{tab && tab.label ? tab.label : 'Clock'}
			</Text>
		</HStack>
	);
};

export default Logo;
