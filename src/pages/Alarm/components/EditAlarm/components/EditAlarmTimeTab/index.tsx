import { FC } from 'react';
import { Controller } from 'react-hook-form';

import { Card, CardBody, CardStack, Divider, Headline, useTheme } from '@davidscicluna/component-library';

import { Text, useMediaQuery, VStack } from '@chakra-ui/react';

import useSpacing from '../../../../../../common/hooks/useSpacing';
import TimePicker from '../../../../../../components/TimePicker';

import { EditAlarmTimeTabProps } from './common/types';

const EditAlarmTimeTab: FC<EditAlarmTimeTabProps> = ({ control, setValue }) => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const spacing = useSpacing();

	return (
		<VStack width='100%' divider={<Divider />} spacing={spacing}>
			<Headline
				// renderCaption={}
				renderTitle={(props) => <Text {...props}>Time</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						Select the time you wish for when the alarm to trigger. Select the Hour & Minute by
						increasing/decreasing.
					</Text>
				)}
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

export default EditAlarmTimeTab;
