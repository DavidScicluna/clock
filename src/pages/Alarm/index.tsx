import { FC } from 'react';

import { Divider, Space, StateOverlay } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { useSelector } from '../../common/hooks';

import AlarmsGrid from './components/AlarmsGrid';
import AlarmsHeader from './components/AlarmsHeader';
import EmptyAlarm from './components/EmptyAlarm';

export const spacing: Space = 2;

const Alarm: FC = () => {
	const alarms = useSelector((state) => state.alarms.data.alarms);

	return (
		<VStack
			width='100%'
			minHeight='100%'
			divider={alarms.length === 0 ? <Divider /> : undefined}
			spacing={0}
			p={[spacing, spacing * 2]}
		>
			<AlarmsHeader />

			<StateOverlay
				width='100%'
				height='100%'
				renderEmpty={() => <EmptyAlarm />}
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
