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

import { HStack, Text, useToast } from '@chakra-ui/react';

import dayjs from 'dayjs';
import { compact } from 'lodash';

import { useSelector } from '../../../../common/hooks';
import { formatTimerNumber } from '../../../../common/utils';
import { setAlarm } from '../../../../store/slices/Alarms';

import { useCheckAlarm } from './common/hooks';
import { AlarmCardProps } from './common/types';
import { getAlarmToastID } from './common/utils';
import AlarmCardActions from './components/AlarmCardActions';
import AlarmCardRepeat from './components/AlarmCardRepeat';

const AlarmCard: FC<AlarmCardProps> = (props) => {
	const toast = useToast();

	const dispatch = useDispatch();
	const timeFormat = useSelector((state) => state.app.data.timeFormat);

	const { alarm } = props;
	const { id, label, time, repeat = [], hasSnooze, isActive } = alarm;

	const color = useGetColor({ color: 'gray', type: 'text.primary' });

	const hasCompleted = useCheckAlarm(alarm);

	const handleCloseToast = (): void => {
		const toastID = getAlarmToastID({ alarmID: id, type: 'success' });
		toast.close(toastID);
	};

	const handleToastStopAlarm = (): void => {
		if (repeat.length === 0) {
			dispatch(setAlarm({ ...alarm, isActive: false }));
		}

		handleCloseToast();
	};

	const handleToastAlarmSnooze = (): void => {
		const { h, m } = time;
		const date = dayjs(new Date())
			.set('hour', h)
			.set('minute', m + 5);

		dispatch(setAlarm({ ...alarm, time: { h: date.hour(), m: date.minute() }, isActive: true }));

		handleCloseToast();
	};

	const handleAlert = (): void => {
		const toastID = getAlarmToastID({ alarmID: id, type: 'success' });

		if (!toast.isActive(toastID)) {
			toast({
				id: toastID,
				duration: null,
				position: 'top',
				render: () => (
					<Alert
						duration={null}
						label={`The ${label !== 'Alarm' ? `${label} Alarm` : label}`}
						description={`The ${label !== 'Alarm' ? `${label} Alarm` : label} has ended. ${compact([
							'Click on the "STOP" button to stop the alarm',
							hasSnooze ? 'click on the "SNOOZE" button to snooze the alarm' : null
						]).join(' or ')}`}
						actions={
							<HStack>
								<Button
									onClick={() => handleToastStopAlarm()}
									size='xs'
									variant={hasSnooze ? 'outlined' : 'contained'}
								>
									Stop
								</Button>
								{hasSnooze ? (
									<Button onClick={() => handleToastAlarmSnooze()} size='xs' variant='contained'>
										Snooze
									</Button>
								) : null}
							</HStack>
						}
						status='success'
					/>
				)
			});
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
					<Text align='center' color={color} fontSize='8xl' fontWeight='semibold' lineHeight='normal'>
						{[
							formatTimerNumber({ time: time.h || 0, timerType: 'h', timeFormat }),
							formatTimerNumber({ time: time.m || 0, timerType: 'm', timeFormat })
						].join(':')}
					</Text>
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
