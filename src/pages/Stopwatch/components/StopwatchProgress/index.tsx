import { FC, useEffect, useState } from 'react';

import { compact } from 'lodash';

import { TimerTypesShort } from '../../../../common/types';
import { checkTimer } from '../../../../common/utils';
import TimeLabel from '../../../../components/TimeLabel';

import { StopwatchProgressProps } from './common/types';

const StopwatchProgress: FC<StopwatchProgressProps> = ({ hasStarted, timer }) => {
	const [types, setTypes] = useState<TimerTypesShort>([]);

	const handleCheck = (): void => {
		const { hours: hasHours, minutes: hasMinutes } = checkTimer({ ...timer });

		const updatedTypes: TimerTypesShort = compact([hasHours ? 'h' : null, hasMinutes ? 'm' : null, 's', 'ms']);

		if (JSON.stringify(types) !== JSON.stringify(updatedTypes)) {
			setTypes([...updatedTypes]);
		}
	};

	useEffect(() => handleCheck(), [timer]);

	return <TimeLabel timerTypes={types} timer={{ ...timer }} isLive={hasStarted} />;
};

export default StopwatchProgress;
