import { FC, useEffect, useState } from 'react';

import { Space, useGetColor, useGetThemeAppearance } from '@davidscicluna/component-library';

import { HStack, VStack } from '@chakra-ui/react';

import { compact } from 'lodash';

import { TimerTypesShort } from '../../common/types';
import TimePickerLabel from '../TimeLabel';

import { TimePickerProps } from './common/types';
import TimePickerControls from './components/TimePickerControls';

export const spacing: Space = 2;

const TimePicker: FC<TimePickerProps> = ({ options, onPick, size }) => {
	const { colorMode } = useGetThemeAppearance();

	const [timerTypes, setTimerTypes] = useState<TimerTypesShort>([]);

	const background = useGetColor({ color: 'gray', type: colorMode === 'light' ? 'lighter' : 'darker' });
	const borderColor = useGetColor({ color: 'gray', type: 'divider' });

	useEffect(() => {
		const { h, m, s, ms } = options || {};
		setTimerTypes(compact([h ? 'h' : null, m ? 'm' : null, s ? 's' : null, ms ? 'ms' : null]) as TimerTypesShort);
	}, [options]);

	return (
		<VStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={spacing}>
			<HStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={0} px={spacing}>
				{timerTypes.map((timerType) => {
					const option = options ? options[timerType] : undefined;
					return (
						<TimePickerControls
							key={timerType}
							timerType={timerType}
							mode='add'
							isDisabled={option ? option.value >= option.max : false}
							onPick={option ? (count) => onPick({ timerType, value: option.value + count }) : undefined}
							size={size}
						/>
					);
				})}
			</HStack>

			<TimePickerLabel
				backgroundColor={background}
				borderWidth='2px'
				borderColor={borderColor}
				borderStyle='solid'
				borderRadius='base'
				timerTypes={timerTypes}
				timer={{
					hours: options && options.h ? options.h.value : undefined,
					minutes: options && options.m ? options.m.value : undefined,
					seconds: options && options.s ? options.s.value : undefined,
					milliseconds: options && options.ms ? options.ms.value : undefined
				}}
				spacing={spacing}
				p={spacing}
			/>

			<HStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={0} px={spacing}>
				{timerTypes.map((timerType) => {
					const option = options ? options[timerType] : undefined;
					return (
						<TimePickerControls
							key={timerType}
							timerType={timerType}
							mode='subtract'
							isDisabled={option ? option.value <= option.min : false}
							onPick={option ? (count) => onPick({ timerType, value: option.value - count }) : undefined}
							size={size}
						/>
					);
				})}
			</HStack>
		</VStack>
	);
};

export default TimePicker;
