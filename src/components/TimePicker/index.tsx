import { FC, useEffect, useState } from 'react';

import { Space } from '@davidscicluna/component-library';

import { HStack, VStack } from '@chakra-ui/react';

import { compact } from 'lodash';

import { TimerTypesShort } from '../../common/types';
import TimePickerLabel from '../TimeLabel';

import { TimePickerProps } from './common/types';
import TimePickerControls from './components/TimePickerControls';

export const spacing: Space = 2;

const TimePicker: FC<TimePickerProps> = ({ options, onPick, size }) => {
	const [timerTypes, setTimerTypes] = useState<TimerTypesShort>([]);

	useEffect(() => {
		const { h, m, s, ms } = options || {};
		setTimerTypes(compact([h ? 'h' : null, m ? 'm' : null, s ? 's' : null, ms ? 'ms' : null]) as TimerTypesShort);
	}, [options]);

	return (
		<VStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={spacing}>
			<HStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={0} px={spacing}>
				{timerTypes.map((type) => {
					const option = options ? options[type] : undefined;
					return (
						<TimePickerControls
							key={type}
							timerType={type}
							mode='add'
							isDisabled={option ? option.value >= option.max : false}
							onPick={
								option ? (count) => onPick({ timerType: type, value: option.value + count }) : undefined
							}
							size={size}
						/>
					);
				})}
			</HStack>

			<TimePickerLabel
				timerTypes={timerTypes}
				timer={{
					hours: options && options.h ? options.h.value : undefined,
					minutes: options && options.m ? options.m.value : undefined,
					seconds: options && options.s ? options.s.value : undefined,
					milliseconds: options && options.ms ? options.ms.value : undefined
				}}
			/>

			<HStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={0} px={spacing}>
				{timerTypes.map((type) => {
					const option = options ? options[type] : undefined;
					return (
						<TimePickerControls
							key={type}
							timerType={type}
							mode='subtract'
							isDisabled={option ? option.value <= option.min : false}
							onPick={
								option ? (count) => onPick({ timerType: type, value: option.value - count }) : undefined
							}
							size={size}
						/>
					);
				})}
			</HStack>
		</VStack>
	);
};

export default TimePicker;
