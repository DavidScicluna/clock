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

import { useGetTab, useSpacing } from '../../../../common/hooks';
import CreateTimerButton from '../CreateTimerButton';

const EmptyTimers: FC = () => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

	const tab = useGetTab('timer');

	const borderColor = useGetColor({ color: 'gray', type: 'divider' });

	const spacing = useSpacing();

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
							icon={tab?.icon || 'timer'}
							category={tab?.category || 'outlined'}
							variant='contained'
							p={2}
						/>

						<StateLabelBody>
							<StateLabelTitle>No Timers</StateLabelTitle>
							<StateLabelSubtitle>
								{`No timers have been created, click the "${upperCase(
									'Create Timer'
								)}" button to create the first timer.`}
							</StateLabelSubtitle>
						</StateLabelBody>

						<StateLabelActions
							renderActions={(props) => (
								<CreateTimerButton
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

export default EmptyTimers;
