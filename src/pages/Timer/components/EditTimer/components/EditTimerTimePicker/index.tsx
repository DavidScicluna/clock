import { FC } from 'react';
import { Controller } from 'react-hook-form';

import {
	Card,
	CardBody,
	CardHeader,
	CardStack,
	CardSubtitle,
	CardTitle,
	Icon,
	Tooltip,
	useTheme
} from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import TimePicker from '../../../../../../components/TimePicker';

import { EditTimerTimePickerProps } from './common/types';

const EditTimerTimePicker: FC<EditTimerTimePickerProps> = ({ control, setValue }) => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	return (
		<Controller
			control={control}
			name='time'
			render={({ field: { onBlur, value, name, ref }, fieldState: { error, invalid } }) => (
				<Card ref={ref} width='100%' onBlur={onBlur} variant='transparent'>
					<CardStack>
						<CardHeader
							renderTitle={(props) => <CardTitle {...props}>Select Time</CardTitle>}
							renderSubtitle={(props) => (
								<CardSubtitle {...props} noOfLines={0}>
									Select the time you wish for when the timer to trigger. Select the Hour, Minute &
									Second by increasing/decreasing.
								</CardSubtitle>
							)}
							actions={
								invalid && error && error.message ? (
									<Tooltip
										color='gray'
										aria-label={`${error.message} (tooltip)`}
										label={error.message}
										placement='top-end'
										isOpen
									>
										<Icon color='red' icon='error' variant='transparent' />
									</Tooltip>
								) : undefined
							}
						/>
						<CardBody>
							<TimePicker
								onPick={({ timerType, value: v }) =>
									setValue(name, { ...value, [timerType]: v }, { shouldDirty: true })
								}
								options={{
									hr: { min: 0, max: 23, value: value.hr },
									min: { min: 0, max: 59, value: value.min },
									sec: { min: 0, max: 59, value: value.sec }
								}}
								size={isSm ? 'md' : 'xl'}
							/>
						</CardBody>
					</CardStack>
				</Card>
			)}
		/>
	);
};

export default EditTimerTimePicker;
