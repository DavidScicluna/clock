import { FC } from 'react';

import {
	HoverOverlay,
	IconButton,
	IconButtonIcon,
	Tooltip,
	useGetThemeAppearance
} from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import DeleteAlarm from '../../../DeleteAlarm';
import EditAlarm from '../../../EditAlarm';

import { AlarmCardActionsProps } from './common/types';

const AlarmCardActions: FC<AlarmCardActionsProps> = ({ alarm }) => {
	const { color } = useGetThemeAppearance();

	return (
		<HStack alignItems='center' justifyContent='center' spacing={0}>
			<EditAlarm
				renderAction={({ children, onClick }) => (
					<HoverOverlay>
						{({ isHovering }) => (
							<Tooltip
								color='gray'
								aria-label={`${children} (tooltip)`}
								label={`${children}`}
								placement='top'
								isOpen={isHovering}
							>
								<IconButton
									aria-label={`${children}`}
									color={isHovering ? color : 'gray'}
									onClick={() => onClick(alarm)}
									size='xs'
									variant='icon'
								>
									<IconButtonIcon icon='edit' category='outlined' />
								</IconButton>
							</Tooltip>
						)}
					</HoverOverlay>
				)}
			/>
			<DeleteAlarm
				renderAction={({ children, onClick }) => (
					<HoverOverlay>
						{({ isHovering }) => (
							<Tooltip
								color='gray'
								aria-label={`${children} (tooltip)`}
								label={children}
								placement='top'
								isOpen={isHovering}
							>
								<IconButton
									aria-label={children}
									color={isHovering ? 'red' : 'gray'}
									onClick={() => onClick(alarm)}
									size='xs'
									variant='icon'
								>
									<IconButtonIcon icon='delete' category='outlined' />
								</IconButton>
							</Tooltip>
						)}
					</HoverOverlay>
				)}
			/>
		</HStack>
	);
};

export default AlarmCardActions;
