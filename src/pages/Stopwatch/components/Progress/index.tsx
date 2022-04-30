import { FC, useState, useCallback, useEffect } from 'react';

import { useTheme, getColor } from '@davidscicluna/component-library';

import { useColorMode, useBoolean, Text } from '@chakra-ui/react';

import TimeProgress from '../../../../components/TimeProgress';
import { checkTimer } from '../../../../common/utils';
import { getStopwatchLabel } from '../../common/utils';

import { ProgressProps } from './types';

const color = 'blue';

const Progress: FC<ProgressProps> = ({ timer }) => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const [time, setTime] = useState<string>('');

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

		setTime(getStopwatchLabel({ ...timer }));
	}, [timer]);

	useEffect(() => handleCheck(), [timer]);

	return (
		<TimeProgress color={color} min={0} max={60} value={timer.seconds}>
			<Text
				align='center'
				color={getColor({ theme, colorMode, type: 'text.secondary' })}
				fontSize={hasHours && hasMinutes ? '4xl' : hasMinutes ? '5xl' : '6xl'}
				fontFamily='mono'
				whiteSpace='nowrap'
				userSelect='none'
			>
				{time}
			</Text>
		</TimeProgress>
	);
};

export default Progress;
