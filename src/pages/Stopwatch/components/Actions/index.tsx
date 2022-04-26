import { FC } from 'react';

import { IconButton, Icon } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import { compact, isEmpty } from 'lodash';

import { ActionsProps } from './types';

const color = 'blue';

const Actions: FC<ActionsProps> = (props) => {
	const { hasStarted = false, timer, onReset, onStartPause } = props;
	const { hours, minutes, seconds, milliseconds } = timer;

	return (
		<HStack>
			<IconButton
				aria-label='Reset'
				isDisabled={hasStarted || isEmpty(compact([hours, minutes, seconds, milliseconds]))}
				onClick={() => onReset()}
				size='xl'
				variant='icon'
			>
				<Icon icon='replay' type='outlined' />
			</IconButton>
			<IconButton
				aria-label={hasStarted ? 'Pause' : 'Start'}
				color={color}
				onClick={() => onStartPause()}
				size='xl'
			>
				<Icon icon={hasStarted ? 'pause' : 'play_arrow'} type='filled' />
			</IconButton>
			<IconButton aria-label='Set lap' isDisabled={!hasStarted} size='xl' variant='icon'>
				<Icon icon='timer' type='outlined' />
			</IconButton>
		</HStack>
	);
};

export default Actions;
