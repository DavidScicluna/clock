import { FC, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import {
	Button,
	CloseIconButton,
	Divider,
	Form,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalStack
} from '@davidscicluna/component-library';

import { Text, useDisclosure, VStack } from '@chakra-ui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { omit } from 'lodash';

import { useSelector, useSpacing } from '../../../../common/hooks';
import { setTimers } from '../../../../store/slices/Timers';
import { Timer } from '../../../../store/slices/Timers/common/types';

import { EditTimerForm, EditTimerProps } from './common/types';
import { getFormDefaultValues } from './common/utils';
import { formSchema } from './common/validations';
import EditTimerLabel from './components/EditTimerLabel';
import EditTimerRepeatable from './components/EditTimerRepeatable';
import EditTimerTimePicker from './components/EditTimerTimePicker';

const EditTimer: FC<EditTimerProps> = ({ renderAction }) => {
	const { isOpen: isEditTimerOpen, onOpen: onEditTimerOpen, onClose: onEditTimerClose } = useDisclosure();

	const dispatch = useDispatch();
	const timers = useSelector((state) => state.timers.data.timers);

	const [timer, setTimer] = useState<Timer>();

	const form = useForm<EditTimerForm>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: getFormDefaultValues(timer, timers.length),
		resolver: zodResolver(formSchema)
	});

	const { control, getValues, reset, handleSubmit } = form;

	const { isDirty } = useFormState({ control });

	const spacing = useSpacing();

	const handleOpen = (timer: Timer): void => {
		const defaultValues = getFormDefaultValues(timer, timers.length);

		setTimer(timer);

		onEditTimerOpen();

		reset({ ...defaultValues });
	};

	const handleClose = (): void => {
		const defaultValues = getFormDefaultValues(timer, timers.length);

		onEditTimerClose();

		reset({ ...defaultValues });
	};

	const handleUpdateTimer = ({ id, ...rest }: Timer): void => {
		dispatch(
			setTimers(timers.map((timer) => (timer.id === id ? { ...timer, ...rest, status: 'started' } : timer)))
		);
	};

	const handleSubmitForm = (): void => {
		const { label, time, isRepeatable } = getValues();

		if (timer) {
			handleUpdateTimer({ ...timer, label, time, isRepeatable });
		}

		setTimeout(() => reset({ time, label, isRepeatable }), 500);
	};

	return (
		<>
			{renderAction({ children: 'Edit Timer', onClick: handleOpen })}

			<Modal isOpen={isEditTimerOpen} onClose={handleClose} size='4xl'>
				<ModalStack as={Form} onSubmit={handleSubmit(handleSubmitForm)}>
					<ModalHeader
						renderTitle={(props) => <Text {...props}>Edit Timer</Text>}
						renderCancel={(props) => (
							<CloseIconButton {...omit(props, ['icon', 'category'])} hasTooltip={false} />
						)}
					/>
					<ModalBody>
						<VStack width='100%' divider={<Divider />} spacing={spacing}>
							<EditTimerLabel {...form} />
							<EditTimerTimePicker {...form} />
							<EditTimerRepeatable {...form} />
						</VStack>
					</ModalBody>
					<ModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={({ isFullWidth, ...rest }) => (
							<Button {...rest} isDisabled={!isDirty} isFullWidth={isFullWidth} type='submit'>
								Update Timer
							</Button>
						)}
					/>
				</ModalStack>
			</Modal>
		</>
	);
};

export default EditTimer;
