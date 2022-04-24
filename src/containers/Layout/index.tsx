import { FC, useState } from 'react';

import { TabBar } from '@davidscicluna/component-library';

import { VStack, Center } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';

import Routes from '../Routes';

const Layout: FC = () => {
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState<number>(0);

	return (
		<VStack width='100%'>
			<Center width='100%'>
				<Routes />
			</Center>

			<Center width='100%' position='fixed' bottom={0} zIndex={1}>
				<TabBar
					color='blue'
					activeTab={activeTab}
					tabs={[
						{
							icon: 'language',
							label: 'World Clock',
							onClick: () => navigate('/', { replace: true })
						},
						{
							icon: 'alarm',
							label: 'Alarm',
							onClick: () => navigate('/alarm', { replace: true })
						},
						{
							icon: 'timer',
							label: 'Stopwatch',
							onClick: () => navigate('/stopwatch', { replace: true })
						},
						{
							icon: 'hourglass_empty',
							label: 'Timer',
							onClick: () => navigate('/timer', { replace: true })
						}
					]}
					onChange={(index) => setActiveTab(index)}
				/>
			</Center>
		</VStack>
	);
};

export default Layout;
