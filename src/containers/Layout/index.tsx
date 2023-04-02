import { FC, useState, useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Space, useTheme, useDebounce, TabBar, Icon, utils } from '@davidscicluna/component-library';

import { VStack, Center } from '@chakra-ui/react';

import { useEffectOnce, useElementSize } from 'usehooks-ts';

import Routes from '../Routes';

const { convertREMToPixels, convertStringToNumber } = utils;

const defaultActiveTab = 0;
const spacing: Space = 2;

const Layout: FC = () => {
	const theme = useTheme();

	const location = useLocation();
	const navigate = useNavigate();

	const [tabBarRef, { height: tabBarHeight }] = useElementSize();

	const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);
	const debouncedActiveTab = useDebounce<number>(activeTab);

	const handleRoutesHeight = useCallback((): string => {
		const spacingHeight = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem')) || 0;

		return `calc(100vh - ${tabBarHeight + spacingHeight}px)`;
	}, [theme, spacing, tabBarHeight]);

	const handleCheckLocation = (): void => {
		let activeTab = defaultActiveTab;

		switch (location.pathname) {
			case '/alarm':
				activeTab = 1;
				break;
			case '/stopwatch':
				activeTab = 2;
				break;
			case '/timer':
				activeTab = 3;
				break;
			default:
				activeTab = 0;
				break;
		}

		setActiveTab(activeTab);
	};

	useEffectOnce(() => handleCheckLocation());

	return (
		<VStack width='100%' spacing={spacing}>
			<Center width='100%' height={handleRoutesHeight()}>
				<Routes />
			</Center>

			<Center ref={tabBarRef} width='100%' position='fixed' bottom={0} zIndex={1}>
				<TabBar
					color='blue'
					activeTab={debouncedActiveTab}
					tabs={[
						{
							renderIcon: (props) => <Icon {...props} icon='language' type='filled' />,
							label: 'World Clock',
							onClick: () => navigate('/', { replace: true })
						},
						{
							renderIcon: (props) => <Icon {...props} icon='alarm' type='filled' />,
							label: 'Alarm',
							onClick: () => navigate('/alarm', { replace: true })
						},
						{
							renderIcon: (props) => <Icon {...props} icon='timer' type='filled' />,
							label: 'Stopwatch',
							onClick: () => navigate('/stopwatch', { replace: true })
						},
						{
							renderIcon: (props) => <Icon {...props} icon='hourglass_empty' type='filled' />,
							label: 'Timer',
							onClick: () => navigate('/timer', { replace: true })
						}
					]}
					onChange={(index: number) => setActiveTab(index)}
					// p={3}
				/>
			</Center>
		</VStack>
	);
};

export default Layout;
