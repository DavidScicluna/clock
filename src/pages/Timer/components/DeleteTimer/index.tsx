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

import { defaultSpacing as spacing } from '../../../../common/hooks/useSpacing';
import store from '../../../../store';
import { setTimers } from '../../../../store/slices/Timers';
import { Timer } from '../../../../store/slices/Timers/common/types';

import { DeleteTimerProps } from './common/types';
import { getDeleteTimerToastID } from './common/utils';

const { convertDurationToMS } = utils;

const DeleteTimer: FC<DeleteTimerProps> = ({ renderAction }) => {
	const theme = useTheme();

	const { isOpen: isDeleteTimerOpen, onOpen: onDeleteTimerOpen, onClose: onDeleteTimerClose } = useDisclosure();

	const toast = useToast();

	const dispatch = useDispatch();

	const [timer, setTimer] = useState<Timer>();

	const handleUndoDeletion = (timer: Timer): void => {
		const { id } = timer;

		toast.close(getDeleteTimerToastID({ timerID: id, type: 'success' }));

		const timers = store.getState().timers.data.timers;
		const index = timers.indexOf(timer);

		dispatch(setTimers([...timers.slice(0, index), { ...timer }, ...timers.slice(index)]));
	};

	const handleSuccessToast = (timer: Timer): void => {
		const { id, label } = timer;

		const toastID = getDeleteTimerToastID({ timerID: id, type: 'success' });

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
							!label.includes('Timer') ? `${label} Timer` : label
						}"`}
						actions={
							<Button onClick={() => handleUndoDeletion(timer)} size='xs' variant='text'>
								Undo
							</Button>
						}
						onClose={() => toast.close(toastID)}
						renderClose={(props) => (
							<CloseIconButton {...omit(props, ['icon', 'category'])} hasTooltip={false} />
						)}
						status='success'
					/>
				)
			});
		}
	};

	const handleErrorToast = (): void => {
		const toastID = getDeleteTimerToastID({ type: 'error' });

		if (!toast.isActive(toastID)) {
			toast({
				id: toastID,
				duration: convertDurationToMS(15),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={15}
						label='Deletion Failed'
						description='Failed to delete the selected timer'
						onClose={() => toast.close(toastID)}
						renderClose={(props) => (
							<CloseIconButton {...omit(props, ['icon', 'category'])} hasTooltip={false} />
						)}
						status='error'
					/>
				)
			});
		}
	};

	const handleDeleteTimer = (): void => {
		const timers = store.getState().timers.data.timers;

		if (timer) {
			const { id } = timer;

			onDeleteTimerClose();

			dispatch(setTimers(timers.filter(({ id: i }) => i !== id)));

			handleSuccessToast(timer);
		} else {
			handleErrorToast();
		}
	};

	const handleOpen = (timer: Timer): void => {
		setTimer(timer);

		onDeleteTimerOpen();
	};

	const handleClose = (): void => {
		setTimer(undefined);

		onDeleteTimerClose();
	};

	return (
		<>
			{renderAction({ children: 'Delete Timer', onClick: handleOpen })}

			<ConfirmModal
				color='red'
				renderCancel={(props) => <CloseIconButton {...omit(props, ['icon', 'category'])} hasTooltip={false} />}
				isOpen={isDeleteTimerOpen}
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
						<ConfirmModalTitle>Delete Timer</ConfirmModalTitle>
						<ConfirmModalSubtitle>
							Are you certain you wish to delete the selected timer? This action is irreversible!
						</ConfirmModalSubtitle>
					</ConfirmModalBody>
					<ConfirmModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={(props) => (
							<Button {...props} onClick={handleDeleteTimer}>
								Delete Timer
							</Button>
						)}
						spacing={spacing}
					/>
				</ConfirmModalStack>
			</ConfirmModal>
		</>
	);
};

export default DeleteTimer;
