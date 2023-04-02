import { FC, useState, useCallback, useEffect } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { checkTimer } from '../../../../common/utils';
import TimeLabel from '../../../../components/TimeLabel';
import TimeProgress from '../../../../components/TimeProgress';
import { getTimerFromSeconds } from '../../common/utils';
import { Timer } from '../../types';

import { ProgressProps } from './types';

const color = 'blue';

const Progress: FC<ProgressProps> = ({ elapsed = 0, total = 0 }) => {
	const [elapsedTimer, setElapsedTimer] = useState<Timer>(getTimerFromSeconds({ seconds: total }));

	const [hasHours, setHasHours] = useBoolean();
	const [hasMinutes, setHasMinutes] = useBoolean();

	const handleCheck = useCallback((): void => {
		const totalTimer = getTimerFromSeconds({ seconds: total });
		const has = checkTimer({ ...totalTimer, milliseconds: 0 });

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

		setElapsedTimer(getTimerFromSeconds({ seconds: elapsed }));
	}, [elapsed]);

	useEffect(() => handleCheck(), [elapsed]);

	return (
		<TimeProgress color={color} min={0} max={total} value={elapsed}>
			<TimeLabel
				timer={{ ...elapsedTimer, milliseconds: 0 }}
				options={{ hours: hasHours, minutes: hasMinutes, milliseconds: false }}
			/>

			{/* Add Badge showing when timer will be completed */}
			{/* <Text
				align='center'
				color={getColor({ theme, colorMode, type: 'text.secondary' })}
				fontSize='xl'
				whiteSpace='nowrap'
				userSelect='none'
			>
				{time}
			</Text> */}
		</TimeProgress>
	);
};

export default Progress;
