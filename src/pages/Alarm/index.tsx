import { FC } from 'react';

import { Divider, StateOverlay } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { useSelector, useSpacing } from '../../common/hooks';

import AlarmsGrid from './components/AlarmsGrid';
import AlarmsHeader from './components/AlarmsHeader';
import EmptyAlarms from './components/EmptyAlarms';

const Alarm: FC = () => {
	const alarms = useSelector((state) => state.alarms.data.alarms);

	const spacing = useSpacing();

	return (
		<VStack
			width='100%'
			minHeight='100%'
			divider={alarms.length === 0 ? <Divider /> : undefined}
			spacing={0}
			p={spacing}
		>
			<AlarmsHeader />

			<StateOverlay
				width='100%'
				height='100%'
				renderEmpty={() => <EmptyAlarms />}
				renderContent={() => <AlarmsGrid />}
				hasGlass={false}
				hasContentAlwaysVisible={false}
				state={alarms.length === 0 ? 'empty' : 'default'}
				sx={{ flex: 1 }}
			/>
		</VStack>
	);
};

export default Alarm;
