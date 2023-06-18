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

import AlarmCard from '../AlarmCard';

import { AlarmGroup, AlarmGroups } from './common/types';
import { getGroups } from './common/utils';

const AlarmsGrid: FC = () => {
	const { color } = useGetThemeAppearance();

	const alarms = useSelector((state) => state.alarms.data.alarms);

	const [alarmGroups, setAlarmGroups] = useState<AlarmGroups>([]);
	const alarmGroupsDebounced = useDebounce<AlarmGroups>(alarmGroups);

	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const spacing = useSpacing();

	const handleAlarmGroups = (): void => {
		const alarmGroups: AlarmGroups = getGroups(alarms);

		if (activeTabDebounced !== 0) {
			const alarmGroup: Undefinable<AlarmGroup> = alarmGroups.find(({ order }) => order === activeTabDebounced);

			if (alarmGroup && alarmGroup.alarms.length === 0) {
				setActiveTab(0);
			}
		}

		setAlarmGroups(alarmGroups);
	};

	useEffect(() => handleAlarmGroups(), [alarms]);

	return (
		<Tabs width='100%' activeTab={activeTabDebounced} onChange={({ index }) => setActiveTab(index)}>
			<VStack width='100%' spacing={spacing}>
				<TabList
					tabs={alarmGroupsDebounced.map(({ label, alarms = [] }, index) => ({
						label,
						isDisabled: !alarms.length,
						renderRight: alarms.length
							? () => (
									<Badge
										color={index === activeTabDebounced ? color : 'gray'}
										isCompact
										isRound
										size='xs'
										variant={index === activeTabDebounced ? 'contained' : 'monochrome'}
									>
										<BadgeLabel>{alarms.length}</BadgeLabel>
									</Badge>
							  )
							: undefined
					}))}
				/>
				<TabPanels>
					{alarmGroupsDebounced.map(({ id, alarms = [] }) => (
						<SimpleGrid key={id} width='100%' columns={[1, 1, 2, 2, 3]} spacing={spacing}>
							{alarms.map((alarm) => (
								<AlarmCard key={alarm.id} alarm={alarm} />
							))}
						</SimpleGrid>
					))}
				</TabPanels>
			</VStack>
		</Tabs>
	);
};

export default AlarmsGrid;
