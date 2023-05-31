import { FC } from 'react';

import { HStack } from '@chakra-ui/react';

import { formatTimerType } from '../../../../common/utils';
import { spacing } from '../../../TimePicker';
import TimeLabelCaption from '../TimeLabelCaption';

import { TimeLabelCaptionsProps } from './common/types';

const TimeLabelCaptions: FC<TimeLabelCaptionsProps> = ({ timerTypes = [] }) => {
	return (
		<HStack
			width='100%'
			alignItems='stretch'
			justifyContent='space-evenly'
			divider={<TimeLabelCaption sx={{ opacity: 0 }}>-</TimeLabelCaption>}
			spacing={spacing}
		>
			{timerTypes.map((type) => (
				<TimeLabelCaption key={type} width='100%'>
					{formatTimerType({ timerType: type, format: 'short' })}
				</TimeLabelCaption>
			))}
		</HStack>
	);
};

export default TimeLabelCaptions;