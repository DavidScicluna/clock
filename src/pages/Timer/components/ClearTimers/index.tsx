import { FC } from 'react';
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
import { Timers } from '../../../../store/slices/Timers/common/types';

import { ClearTimersProps } from './common/types';
import { getClearTimersToastID } from './common/utils';

const { convertDurationToMS } = utils;

const ClearTimers: FC<ClearTimersProps> = ({ renderAction }) => {
	const theme = useTheme();

	const { isOpen: isClearTimersOpen, onOpen: onClearTimersOpen, onClose: onClearTimersClose } = useDisclosure();

	const toast = useToast();

	const dispatch = useDispatch();

	const handleUndoDeletion = (timers: Timers): void => {
		toast.close(getClearTimersToastID({ timers: timers.length, type: 'success' }));

		dispatch(setTimers([...timers]));
	};

	const handleSuccessToast = (timers: Timers): void => {
		const toastID = getClearTimersToastID({ timers: timers.length, type: 'success' });

		if (!toast.isActive(toastID)) {
			toast({
				id: toastID,
				duration: convertDurationToMS(15),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={15}
						label='Deletion Successful'
						description='Successfully deleted all the timers'
						actions={
							<Button onClick={() => handleUndoDeletion(timers)} size='xs' variant='text'>
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

	const handleErrorToast = (timers: Timers): void => {
		const toastID = getClearTimersToastID({ timers: timers.length, type: 'error' });

		if (!toast.isActive(toastID)) {
			toast({
				id: toastID,
				duration: convertDurationToMS(15),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={15}
						label='Deletion Failed'
						description='Failed to delete all the timers'
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

	const handleClearTimers = (): void => {
		const timers = store.getState().timers.data.timers;

		if (timers.length) {
			onClearTimersClose();

			dispatch(setTimers([]));

			handleSuccessToast(timers);
		} else {
			handleErrorToast(timers);
		}
	};

	return (
		<>
			{renderAction({ children: 'Clear Timers', onClick: onClearTimersOpen })}

			<ConfirmModal
				color='red'
				renderCancel={(props) => <CloseIconButton {...omit(props, ['icon', 'category'])} hasTooltip={false} />}
				isOpen={isClearTimersOpen}
				onClose={onClearTimersClose}
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
						<ConfirmModalTitle>Clear Timers</ConfirmModalTitle>
						<ConfirmModalSubtitle>
							Are you certain you wish to delete all the timers? This action is irreversible!
						</ConfirmModalSubtitle>
					</ConfirmModalBody>
					<ConfirmModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={(props) => (
							<Button {...props} onClick={handleClearTimers}>
								Clear Timers
							</Button>
						)}
						spacing={spacing}
					/>
				</ConfirmModalStack>
			</ConfirmModal>
		</>
	);
};

export default ClearTimers;
