import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { CircularProgress, CircularProgressLabel, ColorMode, useColorMode, VStack } from '@chakra-ui/react';

import { TimeProgressProps } from './types';

const { getColor } = utils;

const TimeProgress: FC<TimeProgressProps> = (props) => {
	const theme = useTheme();
	const { colorMode: colorModeHook } = useColorMode();

	const { children, color, colorMode: colorModeProp, ...rest } = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	return (
		<CircularProgress
			{...rest}
			capIsRound
			color={getColor({ theme, colorMode, color, type: 'color' })}
			thickness={theme.space['0.75']}
			trackColor={getColor({ theme, colorMode, type: 'divider' })}
			size='358px'
			sx={{
				transitionDuration: theme.transition.duration.normal,
				transitionTimingFunction: theme.transition.easing['ease-in-out']
			}}
		>
			<CircularProgressLabel width='75%'>
				<VStack width='100%' spacing={0}>
					{children}
				</VStack>
			</CircularProgressLabel>
		</CircularProgress>
	);
};

export default TimeProgress;
