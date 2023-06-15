import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
	Alert,
	Button,
	CloseIconButton,
	ConfirmModal,
	ConfirmModalBody,
	ConfirmModalFooter,
	ConfirmModalIcon,
	ConfirmModalStack,
	ConfirmModalSubtitle,
	ConfirmModalTitle,
	Space,
	useTheme,
	utils
} from '@davidscicluna/component-library';

import { useDisclosure, useToast } from '@chakra-ui/react';

import { omit } from 'lodash';

import store from '../../../../store';
import { setAlarms } from '../../../../store/slices/Alarms';
import { Alarm } from '../../../../store/slices/Alarms/common/types';
import { spacing } from '../..';

import { DeleteAlarmProps } from './common/types';
import { getDeleteAlarmToastID } from './common/utils';

const { convertDurationToMS } = utils;

const DeleteAlarm: FC<DeleteAlarmProps> = ({ renderAction }) => {
	const theme = useTheme();

	const { isOpen: isDeleteAlarmOpen, onOpen: onDeleteAlarmOpen, onClose: onDeleteAlarmClose } = useDisclosure();

	const toast = useToast();

	const dispatch = useDispatch();

	const [alarm, setAlarm] = useState<Alarm>();

	const handleUndoDeletion = (alarm: Alarm): void => {
		toast.close(getDeleteAlarmToastID(alarm.id));

		const alarms = store.getState().alarms.data.alarms;
		const index = alarms.indexOf(alarm);

		dispatch(setAlarms([...alarms.slice(0, index), { ...alarm }, ...alarms.slice(index)]));
	};

	const handleSuccessToast = (alarm: Alarm): void => {
		const { id, label } = alarm;

		const toastID = getDeleteAlarmToastID(id);

		if (!toast.isActive(toastID)) {
			toast({
				id: toastID,
				duration: convertDurationToMS(15),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={15}
						label='Deletion Successful'
						description={`Successfully deleted the selected "${
							label !== 'Alarm' ? `${label} Alarm` : label
						}"`}
						actions={
							<Button onClick={() => handleUndoDeletion(alarm)} size='xs'>
								Undo
							</Button>
						}
						onClose={() => toast.close(toastID)}
						renderClose={(props) => <CloseIconButton {...omit(props, ['icon', 'category'])} />}
						status='success'
					/>
				)
			});
		}
	};

	const handleErrorToast = (): void => {
		const toastID = getDeleteAlarmToastID();

		if (!toast.isActive(toastID)) {
			toast({
				id: toastID,
				duration: convertDurationToMS(15),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={15}
						label='Deletion Failed'
						description='Failed to delete the selected alarm.'
						onClose={() => toast.close(toastID)}
						renderClose={(props) => <CloseIconButton {...omit(props, ['icon', 'category'])} />}
						status='error'
					/>
				)
			});
		}
	};

	const handleDeleteAlarm = (): void => {
		const alarms = store.getState().alarms.data.alarms;

		if (alarm) {
			const { id } = alarm;

			onDeleteAlarmClose();

			dispatch(setAlarms(alarms.filter(({ id: i }) => i !== id)));

			handleSuccessToast(alarm);
		} else {
			handleErrorToast();
		}
	};

	const handleOpen = (alarm: Alarm): void => {
		setAlarm(alarm);

		onDeleteAlarmOpen();
	};

	const handleClose = (): void => {
		setAlarm(undefined);

		onDeleteAlarmClose();
	};

	return (
		<>
			{renderAction({ children: 'Delete Alarm', onClick: handleOpen })}

			<ConfirmModal
				color='red'
				renderCancel={(props) => <CloseIconButton {...omit(props, ['icon', 'category'])} />}
				isOpen={isDeleteAlarmOpen}
				onClose={handleClose}
			>
				<ConfirmModalStack spacing={(spacing * 2) as Space} p={spacing * 2}>
					<ConfirmModalIcon
						width='auto'
						height='auto'
						fontSize={theme.fontSizes['6xl']}
						borderRadius='full'
						icon='delete'
						p={2}
						variant='contained'
					/>
					<ConfirmModalBody>
						<ConfirmModalTitle>Delete Alarm</ConfirmModalTitle>
						<ConfirmModalSubtitle>
							Are you certain you wish to delete the selected alarm? This action is irreversible!
						</ConfirmModalSubtitle>
					</ConfirmModalBody>
					<ConfirmModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={(props) => (
							<Button {...props} onClick={handleDeleteAlarm}>
								Delete Alarm
							</Button>
						)}
						spacing={spacing}
					/>
				</ConfirmModalStack>
			</ConfirmModal>
		</>
	);
};

export default DeleteAlarm;
