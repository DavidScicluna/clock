import { FC } from 'react';

import { ButtonIcon, Divider, Headline, Space, StateOverlay, useTheme } from '@davidscicluna/component-library';

import { Text, useMediaQuery, VStack } from '@chakra-ui/react';

import { useSelector } from '../../common/hooks';

import AlarmsGrid from './components/AlarmsGrid';
import CreateAlarmButton from './components/CreateAlarmButton';
import CreateAlarmIconButton from './components/CreateAlarmIconButton';
import EmptyAlarm from './components/EmptyAlarm';

export const spacing: Space = 2;

const Alarm: FC = () => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const alarms = useSelector((state) => state.alarms.data.alarms);

	return (
		<VStack
			width='100%'
			minHeight='100%'
			divider={alarms.length === 0 ? <Divider /> : undefined}
			spacing={0}
			p={[spacing, spacing * 2]}
		>
			<Headline
				renderTitle={(props) => <Text {...props}>Alarms</Text>}
				// renderSubtitle={() => ()}
				renderRight={() =>
					isSm ? (
						<CreateAlarmIconButton size='sm' />
					) : (
						<CreateAlarmButton renderLeft={(props) => <ButtonIcon {...props} icon='add' />} size='sm' />
					)
				}
				pb={[spacing, spacing * 2]}
			/>

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
