import { FC } from 'react';

import { useGetColor, useGetThemeAppearance } from '@davidscicluna/component-library';

import { HStack, VStack } from '@chakra-ui/react';

import { formatTimerNumber } from '../../common/utils';
import { spacing } from '../TimePicker';

import { isLive as defaultIsLive } from './common/default/props';
import { TimeLabelProps } from './common/types';
import TimeLabelCaptions from './components/TimeLabelCaptions';
import TimeLabelNumber from './components/TimeLabelNumber';
import TimeLabelNumberDivider from './components/TimeLabelNumberDivider';

const TimeLabel: FC<TimeLabelProps> = ({ timerTypes, timer, isLive = defaultIsLive }) => {
	const { colorMode } = useGetThemeAppearance();

	const { hours, minutes, seconds, milliseconds } = timer;

	const background = useGetColor({ color: 'gray', type: colorMode === 'light' ? 'lighter' : 'darker' });
	const borderColor = useGetColor({ color: 'gray', type: 'divider' });

	return (
		<VStack
			width='100%'
			alignItems='stretch'
			justifyContent='space-between'
			background={background}
			borderWidth='2px'
			borderColor={borderColor}
			borderStyle='solid'
			borderRadius='base'
			spacing={spacing}
			p={spacing}
		>
			<TimeLabelCaptions timerTypes={timerTypes} />

			<HStack
				width='100%'
				alignItems='stretch'
				justifyContent='space-evenly'
				divider={<TimeLabelNumberDivider timerTypes={timerTypes} isLive={isLive} />}
				spacing={spacing}
			>
				{timerTypes.map((type, index) => {
					const time =
						type === 'h' && hours
							? hours
							: type === 'm' && minutes
							? minutes
							: type === 's' && seconds
							? seconds
							: type === 'ms' && milliseconds
							? milliseconds
							: 0;
					return (
						<TimeLabelNumber key={index} width='100%' lineHeight='normal' timerTypes={timerTypes}>
							{formatTimerNumber(time)}
						</TimeLabelNumber>
					);
				})}
			</HStack>

			<TimeLabelCaptions timerTypes={timerTypes} />
		</VStack>
	);
};

export default TimeLabel;
