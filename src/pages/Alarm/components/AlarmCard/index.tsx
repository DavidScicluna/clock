import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
	Alert,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardStack,
	CardTitle,
	FormControl,
	Switch,
	useGetColor
} from '@davidscicluna/component-library';

import { HStack, useToast } from '@chakra-ui/react';

import dayjs from 'dayjs';
import { capitalize, compact } from 'lodash';

import { useGetTab, useSelector } from '../../../../common/hooks';
import usePageTitleInterval from '../../../../common/hooks/useSetPageTitle';
import TimeLabel from '../../../../components/TimeLabel';
import { setAlarm } from '../../../../store/slices/Alarms';

import { useCheckAlarm } from './common/hooks';
import { AlarmCardProps } from './common/types';
import { getAlarmToastID } from './common/utils';
import AlarmCardActions from './components/AlarmCardActions';
import AlarmCardRepeat from './components/AlarmCardRepeat';

const AlarmCard: FC<AlarmCardProps> = (props) => {
	const toast = useToast();

	const tab = useGetTab('alarm');

	const dispatch = useDispatch();
	const timeFormat = useSelector((state) => state.app.data.timeFormat);

	const { alarm } = props;
	const { id, label, time, repeat = [], hasSnooze, isActive } = alarm;

	const { onSetMessage, onReset } = usePageTitleInterval({ defaultTitle: capitalize(tab?.label || 'Alarm') });

	const color = useGetColor({ color: 'gray', type: 'text.primary' });

	const hasCompleted = useCheckAlarm(alarm);

	const handleCloseToast = (): void => {
		const toastID = getAlarmToastID({ alarmID: id, type: 'success' });
		toast.close(toastID);
	};

	const handleToastStopAlarm = (): void => {
		onReset();

		if (repeat.length === 0) {
			dispatch(setAlarm({ ...alarm, isActive: false }));
		}

		handleCloseToast();
	};

	const handleToastAlarmSnooze = (): void => {
		const { hr, min } = time;
		const date = dayjs(new Date())
			.set('hour', hr)
			.set('minute', min + 5);

		onReset();

		dispatch(setAlarm({ ...alarm, time: { hr: date.hour(), min: date.minute() }, isActive: true }));

		handleCloseToast();
	};

	const handleAlert = (): void => {
		if (hasCompleted) {
			const toastID = getAlarmToastID({ alarmID: id, type: 'success' });

			onSetMessage(
				['Alarm', `(${!label.includes('Alarm') ? `${label} Alarm` : label} has completed!)`].join(' ')
			);

			if (!toast.isActive(toastID)) {
				toast({
					id: toastID,
					duration: null,
					position: 'top',
					render: () => (
						<Alert
							duration={null}
							label={`The ${!label.includes('Alarm') ? `${label} Alarm` : label}`}
							description={`The ${
								!label.includes('Alarm') ? `${label} Alarm` : label
							} has ended. ${compact([
								'Click on the "STOP" button to stop the alarm',
								hasSnooze ? 'click on the "SNOOZE" button to snooze the alarm' : null
							]).join(' or ')}`}
							actions={
								<HStack>
									<Button isCompact onClick={() => handleToastStopAlarm()} variant='text'>
										Stop
									</Button>
									{hasSnooze ? (
										<Button isCompact onClick={() => handleToastAlarmSnooze()} variant='text'>
											Snooze
										</Button>
									) : null}
								</HStack>
							}
							actionsPosition='bottom'
							status='success'
						/>
					)
				});
			}
		}
	};

	useEffect(() => (hasCompleted ? handleAlert() : undefined), [hasCompleted]);

	return (
		<Card width='100%' color='gray' p={2}>
			<CardStack alignItems='center' justifyContent='center'>
				<CardHeader
					renderTitle={(props) => (
						<CardTitle {...props} sx={{ opacity: isActive ? 1 : 0.5 }}>
							{label}
						</CardTitle>
					)}
					actions={
						// TODO: Fix all forms components props if FormControl is not passed
						<FormControl>
							<Switch
								isChecked={isActive}
								onChange={(isChecked) => dispatch(setAlarm({ ...alarm, isActive: isChecked }))}
								size='sm'
							/>
						</FormControl>
					}
				/>
				<CardBody sx={{ opacity: isActive ? 1 : 0.5 }}>
					<TimeLabel
						// backgroundColor={background}
						// borderWidth='2px'
						// borderColor={borderColor}
						// borderStyle='solid'
						// borderRadius='base'
						timerTypes={['hr', 'min']}
						timer={{ hours: time.hr || 0, minutes: time.min || 0 }}
						isLive={isActive}
						// spacing={spacing}
						// p={spacing}
					/>
				</CardBody>
				<CardFooter>
					<HStack
						width='100%'
						alignItems='center'
						justifyContent={repeat.length ? 'space-between' : 'flex-end'}
						spacing={0.5}
					>
						{repeat.length ? <AlarmCardRepeat repeat={repeat} isActive={isActive} /> : null}
						<AlarmCardActions alarm={alarm} />
					</HStack>
				</CardFooter>
			</CardStack>
		</Card>
	);
};

export default AlarmCard;
