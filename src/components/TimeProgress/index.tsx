import { FC } from 'react';

import { useGetThemeAppearance, useTheme, utils } from '@davidscicluna/component-library';

import { Center, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

import { TimeProgressProps } from './common/types';

const { getColor } = utils;

const TimeProgress: FC<TimeProgressProps> = (props) => {
	const theme = useTheme();

	const { color, colorMode } = useGetThemeAppearance();

	const { children, ...rest } = props;

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
				<Center width='100%' height='100%'>
					{children}
				</Center>
			</CircularProgressLabel>
		</CircularProgress>
	);
};

export default TimeProgress;
