import { FC } from 'react';
import { Controller } from 'react-hook-form';

import {
	Card,
	CardHeader,
	CardStack,
	CardSubtitle,
	CardTitle,
	FormControl,
	Switch
} from '@davidscicluna/component-library';

import { CreateAlarmSnoozeProps } from './common/types';

const CreateAlarmSnooze: FC<CreateAlarmSnoozeProps> = ({ control, setValue }) => {
	return (
		<Controller
			control={control}
			name='hasSnooze'
			render={({ field: { onBlur, value, name, ref }, fieldState: { invalid } }) => (
				<Card ref={ref} width='100%' isDivisible={false} onBlur={onBlur} variant='transparent'>
					<CardStack>
						<CardHeader
							renderTitle={(props) => <CardTitle {...props}>Snooze</CardTitle>}
							renderSubtitle={(props) => (
								<CardSubtitle {...props} noOfLines={0}>
									Toggle if you wish to have the ability to snooze after the timer is triggered.
								</CardSubtitle>
							)}
							actions={
								// TODO: Fix all forms props if FormControl is not passed
								<FormControl>
									<Switch
										isChecked={value}
										isError={invalid}
										onChange={() => setValue(name, !value, { shouldDirty: true })}
									/>
								</FormControl>
							}
						/>
					</CardStack>
				</Card>
			)}
		/>
	);
};

export default CreateAlarmSnooze;
