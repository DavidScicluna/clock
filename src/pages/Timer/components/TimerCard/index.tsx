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
	Switch
} from '@davidscicluna/component-library';

import { HStack, useToast } from '@chakra-ui/react';

import { capitalize, compact } from 'lodash';

import { useGetTab, usePageTitleInterval } from '../../../../common/hooks';
import TimeLabel from '../../../../components/TimeLabel';
import { setTimer } from '../../../../store/slices/Timers';
import { TimerStatus } from '../../../../store/slices/Timers/common/types';

import { useCheckTimer, useTimer } from './common/hooks';
import { TimerCardProps } from './common/types';
import { getTimerToastID } from './common/utils';
import TimerCardActions from './components/TimerCardActions';
import TimerCardDate from './components/TimerCardDate';

const TimerCard: FC<TimerCardProps> = (props) => {
	const toast = useToast();

	const tab = useGetTab('timer');

	const dispatch = useDispatch();

	const { timer } = props;
	const { id, label, time, fixedTime, isRepeatable = false, status } = timer;

	const [elapsed, controls] = useTimer({ timer });

	const { onSetMessage, onReset } = usePageTitleInterval({
		defaultTitle: capitalize(tab?.label || 'Timer')
	});

	const handleCloseToast = (): void => {
		const toastID = getTimerToastID({ timerID: id, type: 'success' });
		toast.close(toastID);
	};

	const handleToastStopTimer = (): void => {
		onReset();

		dispatch(setTimer({ ...timer, status: 'completed' }));

		handleCloseToast();
	};

	const handleToastRepeat = (): void => {
		controls.onReset();

		onReset();

		dispatch(setTimer({ ...timer, time: { ...fixedTime }, status: 'started' }));

		handleCloseToast();
	};

	const handleAlert = (): void => {
		const toastID = getTimerToastID({ timerID: id, type: 'success' });

		onSetMessage(['Timer', `(${!label.includes('Timer') ? `${label} Timer` : label} has completed!)`].join(' '));

		if (!toast.isActive(toastID)) {
			toast({
				id: toastID,
				duration: null,
				position: 'top',
				render: () => (
					<Alert
						duration={null}
						label={`The ${!label.includes('Timer') ? `${label} Timer` : label}`}
						description={`The ${!label.includes('Timer') ? `${label} Timer` : label} has ended. ${compact([
							' Click on the "STOP" button to stop the timer',
							isRepeatable ? 'click on the "REPEAT" button to snooze the timer' : null
						]).join(' or ')}`}
						actions={
							<HStack>
								<Button isCompact onClick={() => handleToastStopTimer()} variant='text'>
									Stop
								</Button>
								{isRepeatable ? (
									<Button isCompact onClick={() => handleToastRepeat()} variant='text'>
										Repeat
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
	};

	const handleTimerStatus = (status: TimerStatus): void => {
		switch (status) {
			case 'started':
				controls.onStart();
				break;
			case 'paused':
				controls.onStop();
				break;
			case 'completed':
				controls.onStop();
				controls.onReset();
				break;
		}
	};

	useCheckTimer({ timer, elapsed, onComplete: handleAlert });

	useEffect(() => handleTimerStatus(status));

	return (
		<Card width='100%' color='gray' p={2}>
			<CardStack alignItems='center' justifyContent='center'>
				<CardHeader
					renderTitle={(props) => (
						<CardTitle
							{...props}
							sx={{ opacity: status === 'started' || status === 'completed' ? 1 : 0.5 }}
						>
							{label}
						</CardTitle>
					)}
					actions={
						// TODO: Fix all forms components props if FormControl is not passed
						<FormControl>
							<Switch
								isChecked={status === 'started'}
								onChange={(isChecked) =>
									dispatch(setTimer({ ...timer, status: isChecked ? 'started' : 'paused' }))
								}
								size='sm'
							/>
						</FormControl>
					}
				/>
				<CardBody>
					<TimeLabel
						// backgroundColor={background}
						// borderWidth='2px'
						// borderColor={borderColor}
						// borderStyle='solid'
						// borderRadius='base'
						timerTypes={['hr', 'min', 'sec']}
						timer={{ hours: time.hr || 0, minutes: time.min || 0, seconds: time.sec || 0 }}
						isLive={status === 'started'}
						// spacing={spacing}
						// p={spacing}
					/>
				</CardBody>
				<CardFooter>
					<HStack width='100%' alignItems='center' justifyContent='space-between' spacing={0.5}>
						<TimerCardDate elapsed={elapsed} status={status} />
						<TimerCardActions timer={timer} />
					</HStack>
				</CardFooter>
			</CardStack>
		</Card>
	);
};

export default TimerCard;
