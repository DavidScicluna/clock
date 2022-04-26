import { FC } from 'react';

import { useTheme, handleHue } from '@davidscicluna/component-library';

import { ColorMode, useColorMode, CircularProgress, CircularProgressLabel, VStack } from '@chakra-ui/react';

import { TimeProgressProps } from './types';

const TimeProgress: FC<TimeProgressProps> = (props) => {
	const theme = useTheme();
	const { colorMode: colorModeHook } = useColorMode();

	const { children, color, colorMode: colorModeProp, ...rest } = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

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
				<VStack width='100%' spacing={0}>
					{children}
				</VStack>
			</CircularProgressLabel>
		</CircularProgress>
	);
};

export default TimeProgress;
