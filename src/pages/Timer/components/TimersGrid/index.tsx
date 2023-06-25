import { FC, useEffect, useState } from 'react';

import {
	Badge,
	BadgeLabel,
	TabList,
	TabPanels,
	Tabs,
	Undefinable,
	useDebounce,
	useGetThemeAppearance
} from '@davidscicluna/component-library';

import { SimpleGrid, VStack } from '@chakra-ui/react';

import { useSelector, useSpacing } from '../../../../common/hooks';
import TimerCard from '../TimerCard';

import { TimerGroup, TimerGroups } from './common/types';
import { getGroups } from './common/utils';

const TimersGrid: FC = () => {
	const { color } = useGetThemeAppearance();

	const timers = useSelector((state) => state.timers.data.timers);

	const [timerGroups, setTimerGroups] = useState<TimerGroups>([]);
	const timerGroupsDebounced = useDebounce<TimerGroups>(timerGroups);

	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const spacing = useSpacing();

	const handleTimerGroups = (): void => {
		const timerGroups: TimerGroups = getGroups(timers);

		if (activeTabDebounced !== 0) {
			const timerGroup: Undefinable<TimerGroup> = timerGroups.find(({ order }) => order === activeTabDebounced);

			if (timerGroup && timerGroup.timers.length === 0) {
				setActiveTab(0);
			}
		}

		setTimerGroups(timerGroups);
	};

	useEffect(() => handleTimerGroups(), [timers]);

	return (
		<Tabs width='100%' activeTab={activeTabDebounced} onChange={({ index }) => setActiveTab(index)}>
			<VStack width='100%' spacing={spacing}>
				<TabList
					tabs={timerGroupsDebounced.map(({ label, timers = [] }, index) => ({
						label,
						isDisabled: !timers.length,
						renderRight: timers.length
							? () => (
									<Badge
										color={index === activeTabDebounced ? color : 'gray'}
										isCompact
										isRound
										size='xs'
										variant={index === activeTabDebounced ? 'contained' : 'monochrome'}
									>
										<BadgeLabel>{timers.length}</BadgeLabel>
									</Badge>
							  )
							: undefined
					}))}
				/>
				<TabPanels>
					{timerGroupsDebounced.map(({ id, timers = [] }) => (
						<SimpleGrid key={id} width='100%' columns={[1, 1, 2, 2, 3]} spacing={spacing}>
							{timers.map((timer) => (
								<TimerCard key={timer.id} timer={timer} />
							))}
						</SimpleGrid>
					))}
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default TimersGrid;
