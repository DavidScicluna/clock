import { FC } from 'react';

import {
	ButtonIcon,
	StateLabel,
	StateLabelActions,
	StateLabelBody,
	StateLabelIcon,
	StateLabelStack,
	StateLabelSubtitle,
	StateLabelTitle,
	useGetColor,
	useTheme
} from '@davidscicluna/component-library';

import { Center, useMediaQuery } from '@chakra-ui/react';

import { upperCase } from 'lodash';

import { spacing } from '../..';
import CreateAlarmButton from '../CreateAlarmButton';

const EmptyAlarm: FC = () => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

	const borderColor = useGetColor({ color: 'gray', type: 'divider' });

	return (
		<Center width='100%' height='100%' pt={spacing}>
			<Center
				width='100%'
				height='100%'
				borderRadius='base'
				borderWidth='2px'
				borderStyle='dashed'
				borderColor={borderColor}
			>
				<StateLabel>
					<StateLabelStack>
						<StateLabelIcon
							width='auto'
							height='auto'
							fontSize={theme.fontSizes['6xl']}
							borderRadius='full'
							icon='alarm'
							category='outlined'
							variant='contained'
							p={2}
						/>

						<StateLabelBody>
							<StateLabelTitle>No Alarms</StateLabelTitle>
							<StateLabelSubtitle>
								{`No alarms have been created, click the "${upperCase(
									'Create Alarm'
								)}" button to create the first alarm.`}
							</StateLabelSubtitle>
						</StateLabelBody>

						<StateLabelActions
							renderActions={(props) => (
								<CreateAlarmButton
									{...props}
									renderLeft={(props) => <ButtonIcon {...props} icon='add' />}
									isFullWidth={isSm}
								/>
							)}
						/>
					</StateLabelStack>
				</StateLabel>
			</Center>
		</Center>
	);
};

export default EmptyAlarm;
