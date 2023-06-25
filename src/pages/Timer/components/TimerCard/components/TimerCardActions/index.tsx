import { FC } from 'react';

import {
	HoverOverlay,
	IconButton,
	IconButtonIcon,
	Tooltip,
	useGetThemeAppearance
} from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import DeleteTimer from '../../../DeleteTimer';
import EditTimer from '../../../EditTimer';

import { TimerCardActionsProps } from './common/types';

const TimerCardActions: FC<TimerCardActionsProps> = ({ timer }) => {
	const { color } = useGetThemeAppearance();

	return (
		<HStack alignItems='center' justifyContent='center' spacing={0}>
			<EditTimer
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
									isCompact
									onClick={() => onClick(timer)}
									variant='icon'
								>
									<IconButtonIcon icon='edit' category='outlined' />
								</IconButton>
							</Tooltip>
						)}
					</HoverOverlay>
				)}
			/>
			<DeleteTimer
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
									isCompact
									onClick={() => onClick(timer)}
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

export default TimerCardActions;
