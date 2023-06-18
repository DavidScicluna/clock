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
import { setAlarms } from '../../../../store/slices/Alarms';
import { Alarms } from '../../../../store/slices/Alarms/common/types';

import { ClearAlarmsProps } from './common/types';
import { getClearAlarmsToastID } from './common/utils';

const { convertDurationToMS } = utils;

const ClearAlarms: FC<ClearAlarmsProps> = ({ renderAction }) => {
	const theme = useTheme();

	const { isOpen: isClearAlarmsOpen, onOpen: onClearAlarmsOpen, onClose: onClearAlarmsClose } = useDisclosure();

	const toast = useToast();

	const dispatch = useDispatch();

	const handleUndoDeletion = (alarms: Alarms): void => {
		toast.close(getClearAlarmsToastID({ alarms: alarms.length, type: 'success' }));

		dispatch(setAlarms([...alarms]));
	};

	const handleSuccessToast = (alarms: Alarms): void => {
		const toastID = getClearAlarmsToastID({ alarms: alarms.length, type: 'success' });

		if (!toast.isActive(toastID)) {
			toast({
				id: toastID,
				duration: convertDurationToMS(15),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={15}
						label='Deletion Successful'
						description='Successfully deleted all the alarms'
						actions={
							<Button onClick={() => handleUndoDeletion(alarms)} size='xs' variant='text'>
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

	const handleErrorToast = (alarms: Alarms): void => {
		const toastID = getClearAlarmsToastID({ alarms: alarms.length, type: 'error' });

		if (!toast.isActive(toastID)) {
			toast({
				id: toastID,
				duration: convertDurationToMS(15),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={15}
						label='Deletion Failed'
						description='Failed to delete all the alarms'
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

	const handleClearAlarms = (): void => {
		const alarms = store.getState().alarms.data.alarms;

		if (alarms.length) {
			onClearAlarmsClose();

			dispatch(setAlarms([]));

			handleSuccessToast(alarms);
		} else {
			handleErrorToast(alarms);
		}
	};

	return (
		<>
			{renderAction({ children: 'Clear Alarms', onClick: onClearAlarmsOpen })}

			<ConfirmModal
				color='red'
				renderCancel={(props) => <CloseIconButton {...omit(props, ['icon', 'category'])} hasTooltip={false} />}
				isOpen={isClearAlarmsOpen}
				onClose={onClearAlarmsClose}
			>
				<ConfirmModalStack spacing={spacing as Space} p={spacing}>
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
						<ConfirmModalTitle>Clear Alarms</ConfirmModalTitle>
						<ConfirmModalSubtitle>
							Are you certain you wish to delete all the alarms? This action is irreversible!
						</ConfirmModalSubtitle>
					</ConfirmModalBody>
					<ConfirmModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={(props) => (
							<Button {...props} onClick={handleClearAlarms}>
								Clear Alarms
							</Button>
						)}
						spacing={spacing}
					/>
				</ConfirmModalStack>
			</ConfirmModal>
		</>
	);
};

export default ClearAlarms;
