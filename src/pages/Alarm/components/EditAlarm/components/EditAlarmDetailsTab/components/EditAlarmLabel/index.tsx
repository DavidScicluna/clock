import { FC } from 'react';
import { Controller } from 'react-hook-form';

import {
	Collapse,
	Fade,
	FormControl,
	FormDescription,
	FormHelperText,
	FormLabel,
	Icon,
	Input
} from '@davidscicluna/component-library';

import { Center, VStack } from '@chakra-ui/react';

import { EditAlarmLabelProps } from './common/types';

const id = 'ds-clock-alarm-edit-alarm-label';

const EditAlarmLabel: FC<EditAlarmLabelProps> = ({ control }) => {
	return (
		<Controller
			control={control}
			name='label'
			render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, isDirty, error } }) => {
				const isSuccess = isDirty && value.length > 0 && !error?.message;
				return (
					<FormControl isError={invalid && !!error?.message} isRequired isSuccess={isSuccess} size='xl'>
						<VStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={0}>
							<FormLabel htmlFor={id}>Label</FormLabel>
							<FormDescription sx={{ fontSize: 'sm' }}>
								Pick a distinctive label for the alert. Maximum 15 characters allowed.
							</FormDescription>
						</VStack>
						<Input
							ref={ref}
							name={name}
							id={id}
							onChange={onChange}
							onBlur={onBlur}
							renderRight={
								isSuccess
									? ({ height }) => (
											<Center as={Fade} width='100%' height='100%' in>
												<Icon
													width={`${height}px`}
													height={`${height}px`}
													fontSize={`${height}px`}
													icon='check'
													variant='unstyled'
												/>
											</Center>
									  )
									: undefined
							}
							value={value}
						/>
						<Collapse in={invalid && !!error?.message}>
							<FormHelperText>{error?.message}</FormHelperText>
						</Collapse>
					</FormControl>
				);
			}}
		/>
	);
};

export default EditAlarmLabel;
