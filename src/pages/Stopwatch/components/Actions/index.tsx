import { FC } from 'react';

import { Icon, IconButton } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import { compact, isEmpty } from 'lodash';

import { ActionsProps } from './types';

const Actions: FC<ActionsProps> = (props) => {
	const { hasStarted = false, timer, onReset, onStartPause, onSetLap } = props;
	const { hours, minutes, seconds, milliseconds } = timer;

	return (
		<HStack spacing={2}>
			<IconButton
				aria-label='Reset'
				isDisabled={hasStarted || isEmpty(compact([hours, minutes, seconds, milliseconds]))}
				onClick={() => onReset()}
				variant='icon'
			>
				<Icon icon='replay' type='outlined' />
			</IconButton>
			<IconButton
				aria-label={hasStarted ? 'Pause' : 'Start'}
				color={hasStarted ? 'red' : 'green'}
				onClick={() => onStartPause()}
				size='xl'
			>
				<Icon icon={hasStarted ? 'pause' : 'play_arrow'} type='filled' />
			</IconButton>
			<IconButton aria-label='Set lap' isDisabled={!hasStarted} onClick={() => onSetLap()} variant='icon'>
				<Icon icon='timer' type='outlined' />
			</IconButton>
		</HStack>
	);
};

export default Actions;
