import { FC, useState, useCallback, useEffect } from 'react';

import { useColorMode, useBoolean, Text } from '@chakra-ui/react';

import TimeProgress from '../../../../components/TimeProgress';
import { checkTimer, getTimerLabel } from '../../../../common/utils';

import { ProgressProps } from './types';

const color = 'blue';

const Progress: FC<ProgressProps> = ({ timer }) => {
	const { colorMode } = useColorMode();

	const [time, setTime] = useState<string>('');

	const [hasHours, setHasHours] = useBoolean();
	const [hasMinutes, setHasMinutes] = useBoolean();

	const handleCheck = useCallback(() => {
		const has = checkTimer(timer);

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

		setTime(getTimerLabel(timer));
	}, [timer]);

	useEffect(() => handleCheck(), [timer]);

	return (
		<TimeProgress color={color} min={0} max={60} value={timer.seconds}>
			<Text
				align='center'
				// TODO implement a proper handleHue method for all cases: divider, text, ... & set name to getHue
				color={`gray.${colorMode === 'light' ? 400 : 500}`}
				fontSize={hasHours && hasMinutes ? '4xl' : hasMinutes ? '5xl' : '6xl'}
				whiteSpace='nowrap'
				userSelect='none'
			>
				{time}
			</Text>
		</TimeProgress>
	);
};

export default Progress;
