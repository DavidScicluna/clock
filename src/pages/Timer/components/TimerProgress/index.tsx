import { FC, useEffect, useState } from 'react';

// TODO: Replace all useBoolean & useConst to use the ds cl ones
import { useBoolean } from '@chakra-ui/react';

import { checkTimer } from '../../../../common/utils';
import TimeLabel from '../../../../components/TimeLabel';
import TimeProgress from '../../../../components/TimeProgress';
import { Timer } from '../../common/types';
import { getTimerFromSeconds } from '../../common/utils';

import { TimerProgressProps } from './common/types';

const TimerProgress: FC<TimerProgressProps> = ({ elapsed = 0, total = 0 }) => {
	const [elapsedTimer, setElapsedTimer] = useState<Timer>(getTimerFromSeconds({ seconds: total }));

	const [hasHours, setHasHours] = useBoolean();
	const [hasMinutes, setHasMinutes] = useBoolean();

	const handleCheck = (): void => {
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
	};

	useEffect(() => handleCheck(), [elapsed]);

	return (
		<TimeProgress min={0} max={total} value={elapsed}>
			<TimeLabel
				timer={{ ...elapsedTimer, milliseconds: 0 }}
				options={{ hours: hasHours, minutes: hasMinutes, milliseconds: false }}
			/>
		</TimeProgress>
	);
};

export default TimerProgress;
