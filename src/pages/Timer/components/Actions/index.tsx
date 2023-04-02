import { FC, useCallback, useEffect } from 'react';

import { useBoolean, HStack } from '@chakra-ui/react';
import { Button, Icon } from '@davidscicluna/component-library';
import { compact, isEmpty } from 'lodash';

import { ActionsProps } from './types';

const Actions: FC<ActionsProps> = (props) => {
	const { status = 'pick', pickedTimer, onClear, onReset, onResumePause, onStart } = props;
	const { hours: hoursPicked, minutes: minutesPicked, seconds: secondsPicked } = pickedTimer;

	const [hasPicked, setHasPicked] = useBoolean();

	const handleCheckPickedTimer = useCallback(() => {
		if (isEmpty(compact([hoursPicked, minutesPicked, secondsPicked]))) {
			setHasPicked.off();
		} else {
			setHasPicked.on();
		}
	}, [hoursPicked, minutesPicked, secondsPicked]);

	useEffect(() => handleCheckPickedTimer(), [pickedTimer]);

	return (
		<HStack width='100%' spacing={2}>
			<Button
				isFullWidth
				isDisabled={!hasPicked && status === 'pick'}
				onClick={status !== 'pick' ? () => onReset() : () => onClear()}
				size='xl'
				variant='outlined'
			>
				{status !== 'pick' ? 'Cancel' : 'Clear'}
			</Button>

			<Button
				renderLeft={() => <Icon icon={status !== 'start' ? 'play_arrow' : 'pause'} type='filled' />}
				color={status !== 'start' ? 'green' : 'red'}
				isFullWidth
				isDisabled={status === 'pick' && !hasPicked}
				onClick={status === 'pick' ? () => onStart() : () => onResumePause()}
				size='xl'
			>
				{status !== 'start' ? 'Start' : 'Pause'}
			</Button>
		</HStack>
	);
};

export default Actions;
