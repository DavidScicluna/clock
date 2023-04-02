import { FC, useState, useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import {
	Space,
	useTheme,
	convertREMToPixels,
	convertStringToNumber,
	TabBar,
	Icon
} from '@davidscicluna/component-library';

import { VStack, Center } from '@chakra-ui/react';

import { useEffectOnce, useElementSize } from 'usehooks-ts';

import Routes from '../Routes';

const spacing: Space = 2;

const Layout: FC = () => {
	const theme = useTheme();

	const location = useLocation();
	const navigate = useNavigate();

	const [tabBarRef, { height: tabBarHeight }] = useElementSize();

	const [activeTab, setActiveTab] = useState<number>(0);

	const handleCheckLocation = useCallback(() => {
		let activeTab = 0;

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
	}, [location]);

	useEffectOnce(() => handleCheckLocation());

	return (
		<VStack width='100%' spacing={spacing}>
			<Center
				width='100%'
				height={`calc(100vh - ${
					tabBarHeight + convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'))
				}px)`}
			>
				<Routes />
			</Center>

			<Center ref={tabBarRef} width='100%' position='fixed' bottom={0} zIndex={1}>
				<TabBar
					color='blue'
					activeTab={activeTab}
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
				/>
			</Center>
		</VStack>
	);
};

export default Layout;
