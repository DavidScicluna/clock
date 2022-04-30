import { FC, useCallback, useEffect } from 'react';

import { useBoolean } from '@chakra-ui/react';

import TimeLabel from '../../../../components/TimeLabel';
import TimeProgress from '../../../../components/TimeProgress';
import { checkTimer } from '../../../../common/utils';

import { ProgressProps } from './types';

const color = 'blue';

const Progress: FC<ProgressProps> = ({ timer }) => {
	const [hasHours, setHasHours] = useBoolean();
	const [hasMinutes, setHasMinutes] = useBoolean();

	const handleCheck = useCallback((): void => {
		const has = checkTimer({ ...timer });

		if (has.hours) {
			setHasHours.on();
		} else {
			setHasHours.off();
		}

		if (has.minutes) {
			setHasMinutes.on();
		} else {
			setHasMinutes.off();
		}
	}, [timer]);

	useEffect(() => handleCheck(), [timer]);

	return (
		<TimeProgress color={color} min={0} max={60} value={timer.seconds}>
			<TimeLabel timer={{ ...timer }} options={{ hours: hasHours, minutes: hasMinutes }} />
		</TimeProgress>
	);
};

export default Progress;
