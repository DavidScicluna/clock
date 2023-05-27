import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
	Icon,
	TabBar,
	TabBarList,
	TabBarOnChangeProps,
	useDebounce,
	useGetThemeAppearance,
	useTheme,
	utils
} from '@davidscicluna/component-library';

import { Grid, GridItem } from '@chakra-ui/react';

import { useEffectOnce, useWindowSize } from 'usehooks-ts';

import tabs from '../../common/data/tabs';
import { getActiveTabFromIndex, getActiveTabIndexFromPathname, updateDocumentMeta } from '../../common/utils';
import Header from '../Header';

import { StructureMobileTabletProps } from './common/types';

const { getColor } = utils;

const StructureMobileTablet: FC<StructureMobileTabletProps> = ({ children }) => {
	const theme = useTheme();

	const { colorMode } = useGetThemeAppearance();

	const location = useLocation();
	const navigate = useNavigate();

	const { height: windowHeight = 0 } = useWindowSize();

	const [activeTab, setActiveTab] = useState<number>(getActiveTabIndexFromPathname(location.pathname));
	const activeTabDebounced = useDebounce<number>(activeTab);

	const handleTabBarChange = ({ index }: TabBarOnChangeProps): void => {
		const tab = getActiveTabFromIndex(index);

		if (tab) {
			updateDocumentMeta(tab);
			navigate(tab.path);
		} else {
			// TODO: Add Alert if tab not found
		}
	};

	useEffect(() => setActiveTab(getActiveTabIndexFromPathname(location.pathname)), [location.pathname]);

	useEffectOnce(() => handleTabBarChange({ index: getActiveTabIndexFromPathname(location.pathname) }));

	return (
		<Grid
			width='100%'
			minHeight={windowHeight ? `${windowHeight}px` : '100vh'}
			templateColumns='1fr'
			templateRows='auto 1fr'
			alignItems='stretch'
			alignContent='stretch'
			justifyContent='stretch'
			gap={0}
		>
			<GridItem
				position='sticky'
				top={0}
				zIndex={1}
				background={getColor({ theme, colorMode, type: 'background' })}
			>
				<Header />
			</GridItem>

			<GridItem>
				<TabBar width='100%' height='100%' activeTab={activeTabDebounced} onChange={handleTabBarChange}>
					<Grid
						width='inherit'
						height='inherit'
						templateColumns='1fr'
						templateRows='1fr auto'
						alignItems='stretch'
						alignContent='stretch'
						justifyContent='stretch'
						gap={0}
					>
						<GridItem>{children}</GridItem>
						<GridItem
							position='sticky'
							bottom={0}
							zIndex={1}
							background={getColor({ theme, colorMode, type: 'background' })}
						>
							<TabBarList
								tabs={tabs.map(({ icon, label }, index) => ({
									renderIcon: ({ color, colorMode }) => (
										<Icon
											color={activeTabDebounced === index ? color : 'gray'}
											colorMode={colorMode}
											width={theme.fontSizes['3xl']}
											height={theme.fontSizes['3xl']}
											fontSize={theme.fontSizes['3xl']}
											icon={icon}
											variant='unstyled'
										/>
									),
									label
								}))}
							/>
						</GridItem>
					</Grid>
				</TabBar>
			</GridItem>
		</Grid>
	);
};

export default StructureMobileTablet;
