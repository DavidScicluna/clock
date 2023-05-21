import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
	TabList,
	Tabs,
	TabsOnChangeProps,
	useDebounce,
	useDSCLProviderContext,
	useTheme,
	utils
} from '@davidscicluna/component-library';

import { Grid, GridItem } from '@chakra-ui/react';

import { useEffectOnce, useWindowSize } from 'usehooks-ts';

import tabs from '../../common/data/tabs';
import { getActiveTabFromIndex, getActiveTabIndexFromPathname, updateDocumentMeta } from '../../common/utils';
import Header from '../Header';

import { StructureDesktopProps } from './common/types';

const { getColor } = utils;

const StructureDesktop: FC<StructureDesktopProps> = ({ children }) => {
	const theme = useTheme();

	const { colorMode } = useDSCLProviderContext();

	const location = useLocation();
	const navigate = useNavigate();

	const { height: windowHeight = 0 } = useWindowSize();

	const [activeTab, setActiveTab] = useState<number>(getActiveTabIndexFromPathname(location.pathname));
	const activeTabDebounced = useDebounce<number>(activeTab);

	const handleTabsChange = ({ index }: TabsOnChangeProps): void => {
		const tab = getActiveTabFromIndex(index);

		if (tab) {
			updateDocumentMeta(tab);
			navigate(tab.path);
		} else {
			// TODO: Add Alert if tab not found
		}
	};

	useEffect(() => setActiveTab(getActiveTabIndexFromPathname(location.pathname)), [location.pathname]);

	useEffectOnce(() => handleTabsChange({ index: getActiveTabIndexFromPathname(location.pathname) }));

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
				<Tabs
					width='100%'
					height='100%'
					activeTab={activeTabDebounced}
					isFitted
					onChange={handleTabsChange}
					size='xl'
				>
					<Grid
						width='inherit'
						height='inherit'
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
							<TabList tabs={tabs.map(({ label }) => ({ label }))} />
						</GridItem>
						<GridItem>{children}</GridItem>
					</Grid>
				</Tabs>
			</GridItem>
		</Grid>
	);
};

export default StructureDesktop;
