import { FC, useEffect, useState } from 'react';

import { useGetColor, useGetThemeAppearance } from '@davidscicluna/component-library';

import { compact } from 'lodash';

import { TimerTypesShort } from '../../../../common/types';
import { checkTimer } from '../../../../common/utils';
import TimeLabel from '../../../../components/TimeLabel';
import { spacing } from '../..';

import { StopwatchProgressProps } from './common/types';

const StopwatchProgress: FC<StopwatchProgressProps> = ({ hasStarted, timer }) => {
	const { colorMode } = useGetThemeAppearance();

	const [timerTypes, setTimerTypes] = useState<TimerTypesShort>([]);

	const background = useGetColor({ color: 'gray', type: colorMode === 'light' ? 'lighter' : 'darker' });
	const borderColor = useGetColor({ color: 'gray', type: 'divider' });

	const handleCheck = (): void => {
		const { hours: hasHours, minutes: hasMinutes } = checkTimer({ ...timer });

		const updatedTypes: TimerTypesShort = compact([hasHours ? 'h' : null, hasMinutes ? 'm' : null, 's', 'ms']);

		if (JSON.stringify(timerTypes) !== JSON.stringify(updatedTypes)) {
			setTimerTypes([...updatedTypes]);
		}
	};

	useEffect(() => handleCheck(), [timer]);

	return (
		<TimeLabel
			backgroundColor={background}
			borderWidth='2px'
			borderColor={borderColor}
			borderStyle='solid'
			borderRadius='base'
			timerTypes={timerTypes}
			timer={timer}
			isLive={hasStarted}
			spacing={spacing}
			p={spacing}
		/>
	);
};

export default StopwatchProgress;
