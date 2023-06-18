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
	ModalStack,
	StepList,
	StepPanels,
	Stepper,
	StepperOnChangeProps,
	Steps,
	StepStatus,
	useDebounce,
	useTheme
} from '@davidscicluna/component-library';

import { Center, Text, useDisclosure, VStack } from '@chakra-ui/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { isEmpty, isNil, omit, reverse } from 'lodash';
import { v4 as uuid } from 'uuid';

import { useSelector } from '../../../../common/hooks';
import { setAlarms } from '../../../../store/slices/Alarms';
import { spacing } from '../..';

import defaultSteps from './common/data/steps';
import { CreateAlarmDetailsForm, CreateAlarmProps, CreateAlarmTimeForm } from './common/types';
import { getDetailsFormDefaultValues, getTimerFormDefaultValues } from './common/utils';
import { detailsFormSchema, timerFormSchema } from './common/validations';
import CreateAlarmDetailsStep from './components/CreateAlarmDetailsStep';
import CreateAlarmTimeStep from './components/CreateAlarmTimeStep';

const CreateAlarm: FC<CreateAlarmProps> = ({ renderAction }) => {
	const theme = useTheme();

	const { isOpen: isCreateAlarmOpen, onOpen: onCreateAlarmOpen, onClose: onCreateAlarmClose } = useDisclosure();

	const dispatch = useDispatch();
	const alarms = useSelector((state) => state.alarms.data.alarms);

	const [activeStep, setActiveStep] = useState<number>(0);
	const activeStepDebounced = useDebounce<number>(activeStep);

	const [steps, setSteps] = useState<Steps>([...defaultSteps]);
	const stepsDebounced = useDebounce<Steps>(steps);

	const timeForm = useForm<CreateAlarmTimeForm>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: getTimerFormDefaultValues(),
		resolver: zodResolver(timerFormSchema)
	});
	const detailsForm = useForm<CreateAlarmDetailsForm>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: getDetailsFormDefaultValues(),
		resolver: zodResolver(detailsFormSchema)
	});

	const {
		control: controlTimeForm,
		setValue: setTimeFormValue,
		getValues: getTimeFormValues,
		reset: resetTimeForm,
		handleSubmit: handleSubmitTimeForm
	} = timeForm;
	const {
		control: controlDetailsForm,
		setValue: setDetailsFormValue,
		getValues: getDetailsFormValues,
		reset: resetDetailsForm,
		handleSubmit: handleSubmitDetailsForm
	} = detailsForm;

	const {
		isDirty: isTimeFormDirty,
		isValid: isTimeFormValid,
		errors: timeFormErrors
	} = useFormState({ control: controlTimeForm });
	const {
		isDirty: isDetailsFormDirty,
		isValid: isDetailsFormValid,
		errors: detailsFormErrors
	} = useFormState({ control: controlDetailsForm });

	const handleStepStatus = ({ index }: StepperOnChangeProps): StepStatus => {
		switch (index) {
			case 0: {
				let status: StepStatus = 'idle';

				if (isTimeFormValid) {
					status = 'success';
				} else if (!(isNil(timeFormErrors) || isEmpty(timeFormErrors))) {
					status = 'error';
				} else if (isTimeFormDirty) {
					status = 'warning';
				}

				return status;
			}
			case 1: {
				let status: StepStatus = 'idle';

				if (isDetailsFormValid) {
					status = 'success';
				} else if (!(isNil(detailsFormErrors) || isEmpty(detailsFormErrors))) {
					status = 'error';
				} else if (isDetailsFormDirty) {
					status = 'warning';
				}

				return status;
			}
			default:
				return 'idle';
		}
	};

	const handleStepperChange = ({ index }: StepperOnChangeProps): void => {
		setActiveStep(index);
		setSteps(
			stepsDebounced.map((step, index) =>
				index === activeStep ? { ...step, status: handleStepStatus({ index }) } : step
			)
		);
	};

	const handleResetTimerForm = (): void => {
		const { time } = getTimerFormDefaultValues();
		setTimeFormValue('time', time, { shouldDirty: true });
	};

	const handleResetDetailsForm = (): void => {
		const { label, repeat, hasSnooze } = getDetailsFormDefaultValues();
		setDetailsFormValue('label', label, { shouldDirty: true });
		setDetailsFormValue('repeat', repeat, { shouldDirty: true });
		setDetailsFormValue('hasSnooze', hasSnooze, { shouldDirty: true });
	};

	const handleOpen = (): void => {
		setActiveStep(0);
		setSteps(
			stepsDebounced.map((step, i) => (i === 0 ? { ...step, status: 'active' } : { ...step, status: 'idle' }))
		);

		onCreateAlarmOpen();

		handleResetTimerForm();
		handleResetDetailsForm();
	};

	const handleClose = (): void => {
		onCreateAlarmClose();

		const { time } = getTimerFormDefaultValues();
		const { label, repeat, hasSnooze } = getDetailsFormDefaultValues();

		resetTimeForm({ time });
		resetDetailsForm({ label, repeat, hasSnooze });

		setActiveStep(0);
		setSteps(
			stepsDebounced.map((step, i) => (i === 0 ? { ...step, status: 'active' } : { ...step, status: 'idle' }))
		);
	};

	const handleSubmitTimerForm = (): void => {
		handleStepperChange({ index: 1 });
	};

	const handleSaveAlert = (): void => {
		const { time } = getTimeFormValues();
		const { label, repeat, hasSnooze } = getDetailsFormValues();

		onCreateAlarmClose();

		dispatch(setAlarms(reverse([...alarms, { time, label, repeat, hasSnooze, id: uuid(), isActive: true }])));

		setTimeout(() => {
			resetTimeForm({ time });
			resetDetailsForm({ label, repeat, hasSnooze });
		}, 500);
	};

	return (
		<>
			{renderAction({ children: 'Create Alarm', onClick: handleOpen })}

			<Modal isOpen={isCreateAlarmOpen} onClose={handleClose} size='4xl'>
				<ModalStack
					as={Form}
					onSubmit={
						activeStepDebounced === 0
							? handleSubmitTimeForm(handleSubmitTimerForm)
							: handleSubmitDetailsForm(handleSaveAlert)
					}
				>
					<ModalHeader
						renderTitle={(props) => <Text {...props}>Create Alarm</Text>}
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
						<Stepper
							width='100%'
							position='relative'
							top={`-${theme.space[spacing]}`}
							activeStep={activeStepDebounced}
							totalSteps={steps.length}
							isConsecutively
							isFitted
							onChange={handleStepperChange}
						>
							<VStack width='100%' divider={<Divider />} spacing={0}>
								<StepList steps={stepsDebounced} />
								<Center width='100%' mt={spacing * 2}>
									<StepPanels>
										<CreateAlarmTimeStep {...timeForm} />
										<CreateAlarmDetailsStep {...detailsForm} />
									</StepPanels>
								</Center>
							</VStack>
						</Stepper>
					</ModalBody>
					<ModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={({ isFullWidth, ...rest }) => (
							<Button {...rest} isFullWidth={isFullWidth} type='submit'>
								{activeStepDebounced === 0 ? 'Next Step' : 'Save Alert'}
							</Button>
						)}
					/>
				</ModalStack>
			</Modal>
		</>
	);
};

export default CreateAlarm;
