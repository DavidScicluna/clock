import { FC } from 'react';
import { Controller } from 'react-hook-form';

import {
	Card,
	CardBody,
	// CardHeader,
	CardStack,
	// CardSubtitle,
	// CardTitle,
	Divider,
	Headline,
	// Icon,
	Step,
	// Tooltip,
	useConst,
	useTheme
} from '@davidscicluna/component-library';

import { Text, useMediaQuery, VStack } from '@chakra-ui/react';

import TimePicker from '../../../../../../components/TimePicker';
import useSpacing from '../../../../../../common/hooks/useSpacing';
import steps from '../../common/data/steps';

import { CreateAlarmTimeStepProps } from './common/types';

const CreateAlarmTimeStep: FC<CreateAlarmTimeStepProps> = ({ control, setValue }) => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const step = useConst<Step>(steps[0]);

	const spacing = useSpacing();

	return (
		<VStack width='100%' divider={<Divider />} spacing={spacing}>
			<Headline
				// renderCaption={}
				renderTitle={(props) => <Text {...props}>{step.title}</Text>}
				renderSubtitle={(props) => <Text {...props}>{step.subtitle}</Text>}
			/>

			<Controller
				control={control}
				name='time'
				render={({
					field: { onBlur, value, name, ref }
					// , fieldState: { invalid, error }
				}) => (
					<Card ref={ref} width='100%' onBlur={onBlur} variant='transparent'>
						<CardStack>
							{/* <CardHeader
								renderTitle={(props) => <CardTitle {...props}>Select Time</CardTitle>}
								renderSubtitle={(props) => (
									<CardSubtitle {...props} noOfLines={0}>
										Select the time you wish for when the alarm to trigger. Select the Hour, Minute
										& Second by increasing/decreasing.
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
							/> */}
							<CardBody>
								<TimePicker
									onPick={({ timerType, value: v }) =>
										setValue(name, { ...value, [timerType]: v }, { shouldDirty: true })
									}
									options={{
										hr: { min: 0, max: 23, value: value.hr },
										min: { min: 0, max: 59, value: value.min }
									}}
									size={isSm ? 'md' : 'xl'}
								/>
							</CardBody>
						</CardStack>
					</Card>
				)}
			/>
		</VStack>
	);
};

export default CreateAlarmTimeStep;
