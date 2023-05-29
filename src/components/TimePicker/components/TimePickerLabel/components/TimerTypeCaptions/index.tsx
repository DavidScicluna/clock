import { FC } from 'react';

import { HStack } from '@chakra-ui/react';

import { formatTimerType } from '../../../../../../common/utils';
import { spacing } from '../../../..';
import TimerTypeCaption from '../TimerTypeCaption';

import { TimerTypeCaptionsProps } from './common/types';

const TimerTypeCaptions: FC<TimerTypeCaptionsProps> = ({ types = [] }) => {
	return (
		<HStack
			width='100%'
			alignItems='stretch'
			justifyContent='space-evenly'
			divider={<TimerTypeCaption sx={{ opacity: 0 }}>-</TimerTypeCaption>}
			spacing={spacing}
		>
			{types.map((type) => (
				<TimerTypeCaption key={type} width='100%'>
					{formatTimerType({ type, format: 'short' })}
				</TimerTypeCaption>
			))}
		</HStack>
	);
};

export default TimerTypeCaptions;
