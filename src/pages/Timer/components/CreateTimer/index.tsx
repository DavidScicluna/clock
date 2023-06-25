import { FC } from 'react';
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
import { omit, reverse } from 'lodash';
import { v4 as uuid } from 'uuid';

import { useSelector, useSpacing } from '../../../../common/hooks';
import { setTimers } from '../../../../store/slices/Timers';

import { CreateTimerForm, CreateTimerProps } from './common/types';
import { getFormDefaultValues } from './common/utils';
import { formSchema } from './common/validations';
import CreateTimerLabel from './components/CreateTimerLabel';
import CreateTimerRepeatable from './components/CreateTimerRepeatable';
import CreateTimerTimePicker from './components/CreateTimerTimePicker';

const CreateTimer: FC<CreateTimerProps> = ({ renderAction }) => {
	const { isOpen: isCreateTimerOpen, onOpen: onCreateTimerOpen, onClose: onCreateTimerClose } = useDisclosure();

	const dispatch = useDispatch();
	const timers = useSelector((state) => state.timers.data.timers);

	const form = useForm<CreateTimerForm>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: getFormDefaultValues(timers.length),
		resolver: zodResolver(formSchema)
	});

	const { control, getValues, reset, handleSubmit } = form;

	const { isDirty } = useFormState({ control });

	const spacing = useSpacing();

	const handleOpen = (): void => {
		const defaultValues = getFormDefaultValues(timers.length);

		onCreateTimerOpen();

		reset({ ...defaultValues });
	};

	const handleClose = (): void => {
		const defaultValues = getFormDefaultValues(timers.length);

		onCreateTimerClose();

		reset({ ...defaultValues });
	};

	const handleSaveTimer = (): void => {
		const { label, time, isRepeatable } = getValues();

		onCreateTimerClose();

		dispatch(
			setTimers(
				reverse([
					...timers,
					{ id: uuid(), label, time, fixedTime: { ...time }, isRepeatable, status: 'started' }
				])
			)
		);

		setTimeout(() => reset({ time, label, isRepeatable }), 500);
	};

	return (
		<>
			{renderAction({ children: 'Create Timer', onClick: handleOpen })}

			<Modal isOpen={isCreateTimerOpen} onClose={handleClose} size='4xl'>
				<ModalStack as={Form} onSubmit={handleSubmit(handleSaveTimer)}>
					<ModalHeader
						renderTitle={(props) => <Text {...props}>Create Timer</Text>}
						renderCancel={(props) => (
							<CloseIconButton {...omit(props, ['icon', 'category'])} hasTooltip={false} />
						)}
					/>
					<ModalBody>
						<VStack width='100%' divider={<Divider />} spacing={spacing}>
							<CreateTimerLabel {...form} />
							<CreateTimerTimePicker {...form} />
							<CreateTimerRepeatable {...form} />
						</VStack>
					</ModalBody>
					<ModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={({ isFullWidth, ...rest }) => (
							<Button {...rest} isDisabled={!isDirty} isFullWidth={isFullWidth} type='submit'>
								Save Timer
							</Button>
						)}
					/>
				</ModalStack>
			</Modal>
		</>
	);
};

export default CreateTimer;
