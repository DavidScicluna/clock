/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import { Controller } from 'react-hook-form';

import {
	Button,
	ButtonGroup,
	ButtonGroupItem,
	ButtonIcon,
	Card,
	CardBody,
	CardHeader,
	CardStack,
	CardSubtitle,
	CardTitle,
	Fade,
	HorizontalScroll,
	useGetThemeAppearance
} from '@davidscicluna/component-library';

import { Box, HStack } from '@chakra-ui/react';

import { sort } from 'fast-sort';
import { range } from 'lodash';

import { WeekDayIndex } from '../../../../../../../../common/types';
import { getWeekDayLabel } from '../../../../../../../../common/utils';

import { CreateAlarmRepeatProps } from './common/types';

const horizontalScrollItem = 'react-horizontal-scrolling-menu--item';

const total = 7;

const CreateAlarmRepeat: FC<CreateAlarmRepeatProps> = ({ control, setValue }) => {
	const { color } = useGetThemeAppearance();

	return (
		<Controller
			control={control}
			name='repeat'
			render={({ field: { onBlur, value: repeats = [], name, ref } }) => (
				<Card ref={ref} width='100%' isDivisible={false} onBlur={onBlur} variant='transparent'>
					<CardStack>
						<CardHeader
							renderTitle={(props) => <CardTitle {...props}>Repeat</CardTitle>}
							renderSubtitle={(props) => (
								<CardSubtitle {...props} noOfLines={0}>
									Select the days of the week you wish the alarm to repeat. Click on the day of the
									week to select/unselect.
								</CardSubtitle>
							)}
							actions={
								<HStack spacing={0}>
									<Button
										isDisabled={repeats.length === 0 || repeats.length === total}
										onClick={() => setValue(name, [], { shouldDirty: true })}
										size='xs'
										variant='text'
									>
										Clear
									</Button>
									<Button
										onClick={() =>
											setValue(
												name,
												repeats.length !== total
													? sort(range(total).map((day) => day as WeekDayIndex)).asc()
													: [],
												{ shouldDirty: true }
											)
										}
										size='xs'
										variant='text'
									>
										{`${repeats.length === total ? 'Remove' : 'Select'} All`}
									</Button>
								</HStack>
							}
						/>
						<CardBody>
							<ButtonGroup
								width='100%'
								isAttached={false}
								sx={{ [`& .${horizontalScrollItem}`]: { width: '100%' } }}
							>
								<HorizontalScroll width='100%' renderDivider={({ padding }) => <Box p={padding} />}>
									{range(total).map((day, index) => {
										const isSelected = repeats.some((d) => d === day);
										return (
											<ButtonGroupItem key={day} width='100%' index={index} total={6}>
												<Button
													color={isSelected ? color : 'gray'}
													isFullWidth
													renderRight={
														isSelected
															? () => (
																	<Fade in>
																		<ButtonIcon icon='check' />
																	</Fade>
															  )
															: undefined
													}
													onClick={
														repeats
															? () =>
																	setValue(
																		name,
																		sort(
																			isSelected
																				? repeats.filter((d) => d !== day)
																				: [...repeats, day as WeekDayIndex]
																		).asc(),
																		{
																			shouldDirty: true
																		}
																	)
															: undefined
													}
													variant={isSelected ? 'outlined' : 'monochrome'}
												>
													{getWeekDayLabel({
														day: day as WeekDayIndex,
														format: 'short'
													})}
												</Button>
											</ButtonGroupItem>
										);
									})}
								</HorizontalScroll>
							</ButtonGroup>
						</CardBody>
					</CardStack>
				</Card>
			)}
		/>
	);
};

export default CreateAlarmRepeat;
