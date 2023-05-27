import { FC, useEffect } from 'react';

import { Button, Icon } from '@davidscicluna/component-library';

import { HStack, useBoolean } from '@chakra-ui/react';

import { compact, isEmpty } from 'lodash';

import { TimerControlsProps } from './common/types';

const TimerControls: FC<TimerControlsProps> = (props) => {
	const { status = 'picker', pickedTimer, onClear, onReset, onResumePause, onStart } = props;
	const { hours: hoursPicked, minutes: minutesPicked, seconds: secondsPicked } = pickedTimer;

	const [hasPicked, setHasPicked] = useBoolean();

	const handleCheckPickedTimer = (): void => {
		if (isEmpty(compact([hoursPicked, minutesPicked, secondsPicked]))) {
			setHasPicked.off();
		} else {
			setHasPicked.on();
		}
	};

	useEffect(() => handleCheckPickedTimer(), [pickedTimer]);

	return (
		<HStack width='100%' spacing={2}>
			<Button
				color='gray'
				isFullWidth
				isDisabled={!hasPicked && status === 'picker'}
				onClick={status !== 'picker' ? () => onReset() : () => onClear()}
				size='xl'
				variant='outlined'
			>
				{status !== 'picker' ? 'Cancel' : 'Clear'}
			</Button>

			<Button
				renderLeft={() => <Icon icon={status !== 'start' ? 'play_arrow' : 'pause'} type='filled' />}
				color={status !== 'start' ? 'green' : 'red'}
				isFullWidth
				isDisabled={status === 'picker' && !hasPicked}
				onClick={status === 'picker' ? () => onStart() : () => onResumePause()}
				size='xl'
			>
				{status !== 'start' ? 'Start' : 'Pause'}
			</Button>
		</HStack>
	);
};

export default TimerControls;
