import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import {
	Button,
	CloseIconButton,
	Form,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalStack,
	TabList,
	TabPanels,
	Tabs,
	useDebounce,
	useTheme
} from '@davidscicluna/component-library';

import { Center, Text, useDisclosure, VStack } from '@chakra-ui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { omit } from 'lodash';

import { useSelector } from '../../../../common/hooks';
import { setAlarms } from '../../../../store/slices/Alarms';
import { Alarm } from '../../../../store/slices/Alarms/common/types';
import { spacing } from '../..';

import { EditAlarmDetailsForm, EditAlarmProps, EditAlarmTimeForm } from './common/types';
import { getDetailsFormDefaultValues, getTimerFormDefaultValues } from './common/utils';
import { detailsFormSchema, timerFormSchema } from './common/validations';
import EditAlarmDetailsTab from './components/EditAlarmDetailsTab';
import EditAlarmTimeTab from './components/EditAlarmTimeTab';

const EditAlarm: FC<EditAlarmProps> = ({ renderAction }) => {
	const theme = useTheme();

	const { isOpen: isEditAlarmOpen, onOpen: onEditAlarmOpen, onClose: onEditAlarmClose } = useDisclosure();

	const dispatch = useDispatch();
	const alarms = useSelector((state) => state.alarms.data.alarms);

	const [alarm, setAlarm] = useState<Alarm>();

	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const timeForm = useForm<EditAlarmTimeForm>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: getTimerFormDefaultValues(),
		resolver: zodResolver(timerFormSchema)
	});
	const detailsForm = useForm<EditAlarmDetailsForm>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: getDetailsFormDefaultValues(),
		resolver: zodResolver(detailsFormSchema)
	});

	const { setValue: setTimeFormValue, reset: resetTimeForm, handleSubmit: handleSubmitTimeForm } = timeForm;
	const {
		setValue: setDetailsFormValue,
		reset: resetDetailsForm,
		handleSubmit: handleSubmitDetailsForm
	} = detailsForm;

	const handleResetTimerForm = (alarm: Alarm): void => {
		const { time } = getTimerFormDefaultValues(alarm);
		setTimeFormValue('time', time, { shouldDirty: true });
	};

	const handleResetDetailsForm = (alarm: Alarm): void => {
		const { label, repeat, hasSnooze } = getDetailsFormDefaultValues(alarm);
		setDetailsFormValue('label', label, { shouldDirty: true });
		setDetailsFormValue('repeat', repeat, { shouldDirty: true });
		setDetailsFormValue('hasSnooze', hasSnooze, { shouldDirty: true });
	};

	const handleOpen = (alarm: Alarm): void => {
		setAlarm(alarm);
		setActiveTab(0);

		handleResetTimerForm(alarm);
		handleResetDetailsForm(alarm);

		setTimeout(() => onEditAlarmOpen(), 500);
	};

	const handleClose = (): void => {
		onEditAlarmClose();

		const { time } = getTimerFormDefaultValues(alarm);
		const { label, repeat, hasSnooze } = getDetailsFormDefaultValues(alarm);

		resetTimeForm({ time });
		resetDetailsForm({ label, repeat, hasSnooze });

		setActiveTab(0);
	};

	const handleUpdateAlarm = ({ id, ...rest }: Alarm): void => {
		dispatch(setAlarms(alarms.map((alarm) => (alarm.id === id ? { ...alarm, ...rest, isActive: true } : alarm))));
	};

	const handleSaveTimeForm = ({ time }: EditAlarmTimeForm): void => {
		if (alarm) {
			handleUpdateAlarm({ ...alarm, time });
		}

		setTimeout(() => resetTimeForm({ time }), 500);
	};

	const handleSaveDetailsForm = ({ label, repeat, hasSnooze }: EditAlarmDetailsForm): void => {
		if (alarm) {
			handleUpdateAlarm({ ...alarm, label, repeat, hasSnooze });
		}

		setTimeout(() => resetDetailsForm({ label, repeat, hasSnooze }), 500);
	};

	return (
		<>
			{renderAction({ children: 'Edit Alarm', onClick: handleOpen })}

			<Modal isOpen={isEditAlarmOpen} onClose={handleClose} size='4xl'>
				<ModalStack
					as={Form}
					onSubmit={
						activeTabDebounced === 0
							? handleSubmitTimeForm(handleSaveTimeForm)
							: handleSubmitDetailsForm(handleSaveDetailsForm)
					}
				>
					<ModalHeader
						renderTitle={(props) => <Text {...props}>Edit Alarm</Text>}
						// renderSubtitle={(props) => (
						// 	<Text {...props}>
						// 		{`Filter ${formatMediaTypeLabel({
						// 			type: 'multiple',
						// 			mediaType
						// 		})} by Release Date, Genres, Certifications, Rating, Number of Ratings, Runtime & by Keywords.`}
						// 	</Text>
						// )}
						renderCancel={(props) => (
							<CloseIconButton {...omit(props, ['icon', 'category'])} hasTooltip={false} />
						)}
					/>
					<ModalBody>
						<Tabs
							width='100%'
							position='relative'
							top={`-${theme.space[spacing]}`}
							activeTab={activeTabDebounced}
							isConsecutively
							isFitted
							onChange={({ index }) => setActiveTab(index)}
						>
							<VStack width='100%' spacing={0}>
								<TabList
									tabs={[
										{
											label: 'Time'
										},
										{
											label: 'Details'
										}
									]}
								/>
								<Center width='100%' mt={spacing * 2}>
									<TabPanels>
										<EditAlarmTimeTab {...timeForm} />
										<EditAlarmDetailsTab {...detailsForm} />
									</TabPanels>
								</Center>
							</VStack>
						</Tabs>
					</ModalBody>
					<ModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={({ isFullWidth, ...rest }) => (
							<Button {...rest} isFullWidth={isFullWidth} type='submit'>
								{activeTabDebounced === 0 ? 'Update Alarm Time' : 'Update Alarm Details'}
							</Button>
						)}
					/>
				</ModalStack>
			</Modal>
		</>
	);
};

export default EditAlarm;
