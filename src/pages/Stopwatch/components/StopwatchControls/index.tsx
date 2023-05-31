import { FC } from 'react';

import { Button, HoverOverlay, Icon, IconButton, Tooltip } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import { compact, isEmpty } from 'lodash';

import { StopwatchControlsProps } from './common/types';

const StopwatchControls: FC<StopwatchControlsProps> = (props) => {
	const { hasStarted = false, timer, onReset, onStart, onPause, onSetLap } = props;
	const { hours, minutes, seconds, milliseconds } = timer;

	return (
		<HStack width='100%' spacing={0}>
			<HoverOverlay>
				{({ isHovering }) => {
					const isDisabled = hasStarted || isEmpty(compact([hours, minutes, seconds, milliseconds]));
					return (
						<Tooltip
							color='gray'
							aria-label='Reset Stopwatch (tooltip)'
							label='Reset'
							placement='top'
							isOpen={!isDisabled && isHovering}
							isDisabled={isDisabled}
						>
							<IconButton
								aria-label='Reset Stopwatch'
								color='gray'
								isDisabled={isDisabled}
								onClick={() => onReset()}
								size='xl'
								variant='icon'
							>
								<Icon icon='replay' type='outlined' />
							</IconButton>
						</Tooltip>
					);
				}}
			</HoverOverlay>

			<Button
				renderLeft={() => <Icon icon={hasStarted ? 'pause' : 'play_arrow'} type='filled' variant='unstyled' />}
				color={hasStarted ? 'red' : 'green'}
				isFullWidth
				onClick={() => (hasStarted ? onPause() : onStart())}
				size='xl'
			>
				{hasStarted ? 'Pause' : 'Start'}
			</Button>

			<HoverOverlay>
				{({ isHovering }) => {
					const isDisabled = !hasStarted;
					return (
						<Tooltip
							color='gray'
							aria-label='Set a lap (tooltip)'
							label='Set a lap'
							placement='top'
							isOpen={!isDisabled && isHovering}
							isDisabled={isDisabled}
						>
							<IconButton
								aria-label='Set a lap'
								color='gray'
								isDisabled={!hasStarted}
								onClick={() => onSetLap()}
								size='xl'
								variant='icon'
							>
								<Icon icon='timer' type='outlined' />
							</IconButton>
						</Tooltip>
					);
				}}
			</HoverOverlay>
		</HStack>
	);
};

export default StopwatchControls;
