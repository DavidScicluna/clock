import { FC } from 'react';

import { useDSCLProviderContext, useTheme, utils } from '@davidscicluna/component-library';

import { Container, useMediaQuery } from '@chakra-ui/react';

import { LayoutProps } from './common/types';
import Structure from './components/Structure';

const { getColor } = utils;

const Layout: FC<LayoutProps> = ({ children }) => {
	const theme = useTheme();

	const { colorMode } = useDSCLProviderContext();

	// const [isSm] = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const [isXl] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);

	return (
		<Container
			width='100%'
			maxWidth={theme.sizes.container.xl}
			minHeight='100vh'
			centerContent
			borderWidth='0px'
			borderLeftWidth={`${isXl ? 2 : 0}px`}
			borderRightWidth={`${isXl ? 2 : 0}px`}
			borderStyle='solid'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			p={0}
		>
			<Structure device={isXl ? 'desktop' : isMd ? 'tablet' : 'mobile'}>{children}</Structure>
		</Container>
	);
};

export default Layout;
