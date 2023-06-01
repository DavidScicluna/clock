import { FC } from 'react';

import { HStack, VStack } from '@chakra-ui/react';

import { formatTimerNumber } from '../../common/utils';

import { isLive as defaultIsLive } from './common/default/props';
import { TimeLabelProps } from './common/types';
import TimeLabelCaptions from './components/TimeLabelCaptions';
import TimeLabelNumber from './components/TimeLabelNumber';
import TimeLabelNumberDivider from './components/TimeLabelNumberDivider';

const TimeLabel: FC<TimeLabelProps> = ({ timerTypes, timer, isLive = defaultIsLive, spacing, ...rest }) => {
	const { hours, minutes, seconds, milliseconds } = timer;

	return (
		<VStack
			{...rest}
			width='100%'
			height='100%'
			alignItems='stretch'
			justifyContent='space-between'
			spacing={spacing}
		>
			<TimeLabelCaptions timerTypes={timerTypes} />

			<HStack
				width='100%'
				alignItems='stretch'
				justifyContent='space-evenly'
				divider={<TimeLabelNumberDivider timerTypes={timerTypes} isLive={isLive} />}
				spacing={spacing}
			>
				{timerTypes.map((timerType, index) => (
					<TimeLabelNumber key={index} width='100%' lineHeight='normal' timerTypes={timerTypes}>
						{formatTimerNumber(
							timerType === 'h' && hours
								? hours
								: timerType === 'm' && minutes
								? minutes
								: timerType === 's' && seconds
								? seconds
								: timerType === 'ms' && milliseconds
								? milliseconds
								: 0
						)}
					</TimeLabelNumber>
				))}
			</HStack>

			<TimeLabelCaptions timerTypes={timerTypes} />
		</VStack>
	);
};

export default TimeLabel;
