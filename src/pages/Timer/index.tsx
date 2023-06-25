import { FC } from 'react';

import { Divider, StateOverlay } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { useSelector, useSpacing } from '../../common/hooks';

import EmptyTimers from './components/EmptyTimers';
import TimersGrid from './components/TimersGrid';
import TimersHeader from './components/TimersHeader';

const Timer: FC = () => {
	const timers = useSelector((state) => state.timers.data.timers);

	const spacing = useSpacing();

	return (
		<VStack
			width='100%'
			minHeight='100%'
			divider={timers.length === 0 ? <Divider /> : undefined}
			spacing={0}
			p={spacing}
		>
			<TimersHeader />

			<StateOverlay
				width='100%'
				height='100%'
				renderEmpty={() => <EmptyTimers />}
				renderContent={() => <TimersGrid />}
				hasGlass={false}
				hasContentAlwaysVisible={false}
				state={timers.length === 0 ? 'empty' : 'default'}
				sx={{ flex: 1 }}
			/>
		</VStack>
	);
};

export default Timer;
