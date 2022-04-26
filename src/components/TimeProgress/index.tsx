import { FC, useCallback } from 'react';

import { useTheme, handleHue } from '@davidscicluna/component-library';

import { ColorMode, useColorMode, useBoolean, CircularProgress, CircularProgressLabel, Text } from '@chakra-ui/react';

import { compact } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { TimeProgressProps } from './types';

const TimeProgress: FC<TimeProgressProps> = (props) => {
	const theme = useTheme();
	const { colorMode: colorModeHook } = useColorMode();

	const { color, colorMode: colorModeProp, timer, ...rest } = props;

	const [hasHours, setHasHours] = useBoolean();
	const [hasMinutes, setHasMinutes] = useBoolean();

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	const handleTimerLabel = useCallback((): string => {
		const { hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = timer;

		const hr = hours > 0 ? (hours >= 10 ? hours : `0${hours}`) : 0;
		const min =
			minutes > 0 || (hours > 0 && minutes === 0)
				? minutes >= 10
					? minutes
					: minutes > 0
					? `0${minutes}`
					: '00'
				: 0;
		const sec = seconds >= 10 ? seconds : `0${seconds}`;
		const ms = milliseconds >= 10 ? milliseconds : `0${milliseconds}`;

		return compact([hr, min, `${sec}.${ms}`]).join(':');
	}, [timer]);

	const handleCheckTimer = useCallback(() => {
		const { hours = 0, minutes = 0 } = timer;

		if (hours > 0) {
			setHasHours.on();
		} else {
			setHasHours.off();
		}

		if (minutes > 0 || (hours > 0 && minutes === 0)) {
			setHasMinutes.on();
		} else {
			setHasMinutes.off();
		}
	}, [timer]);

	useUpdateEffect(() => handleCheckTimer(), [timer]);

	return (
		<CircularProgress
			{...rest}
			capIsRound
			color={`${color}.${handleHue(colorMode, color)}`}
			thickness={theme.space['0.75']}
			trackColor={`gray.${colorMode === 'light' ? 200 : 700}`}
			size='358px'
			sx={{
				transitionDuration: theme.transition.duration.normal,
				transitionTimingFunction: theme.transition.easing['ease-in-out']
			}}
		>
			<CircularProgressLabel width='75%'>
				<Text
					align='center'
					color={`gray.${handleHue(colorMode, 'gray')}`}
					fontSize={hasHours && hasMinutes ? '4xl' : hasMinutes ? '5xl' : '6xl'}
					whiteSpace='nowrap'
					userSelect='none'
				>
					{handleTimerLabel()}
				</Text>
			</CircularProgressLabel>
		</CircularProgress>
	);
};

export default TimeProgress;
