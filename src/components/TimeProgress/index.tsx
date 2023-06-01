import { FC } from 'react';

import { useGetThemeAppearance, useTheme, utils } from '@davidscicluna/component-library';

import { Center, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

import { TimeProgressProps } from './common/types';

const { getColor } = utils;

const TimeProgress: FC<TimeProgressProps> = ({ children, ...rest }) => {
	const theme = useTheme();

	const { color, colorMode } = useGetThemeAppearance();

	return (
		<CircularProgress
			{...rest}
			capIsRound
			color={getColor({ theme, colorMode, color, type: 'color' })}
			thickness={theme.space['0.5']}
			trackColor={getColor({ theme, colorMode, type: 'divider' })}
			sx={{
				transitionDuration: theme.transition.duration.normal,
				transitionTimingFunction: theme.transition.easing['ease-in-out']
			}}
		>
			<CircularProgressLabel as={Center} width='100%' height='100%'>
				{children}
			</CircularProgressLabel>
		</CircularProgress>
	);
};

export default TimeProgress;
