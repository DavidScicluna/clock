import { FC, useEffect, useState } from 'react';

import { useGetColor, useGetThemeAppearance } from '@davidscicluna/component-library';

import { HStack, VStack } from '@chakra-ui/react';

import { compact } from 'lodash';

import { useSpacing } from '../../common/hooks';
import { TimerTypesShort } from '../../common/types';
import TimePickerLabel from '../TimeLabel';

import { TimePickerProps } from './common/types';
import TimePickerControls from './components/TimePickerControls';

const TimePicker: FC<TimePickerProps> = ({ options, onPick, size }) => {
	const { colorMode } = useGetThemeAppearance();

	const [timerTypes, setTimerTypes] = useState<TimerTypesShort>([]);

	const background = useGetColor({ color: 'gray', type: colorMode === 'light' ? 'lighter' : 'darker' });
	const borderColor = useGetColor({ color: 'gray', type: 'divider' });

	const spacing = useSpacing();

	useEffect(() => {
		const { hr, min, sec, ms } = options || {};
		setTimerTypes(
			compact([hr ? 'hr' : null, min ? 'min' : null, sec ? 'sec' : null, ms ? 'ms' : null]) as TimerTypesShort
		);
	}, [options]);

	return (
		<VStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={spacing}>
			<HStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={spacing}>
				{timerTypes.map((timerType) => {
					const option = options ? options[timerType] : undefined;
					return (
						<TimePickerControls
							key={timerType}
							timerType={timerType}
							mode='add'
							isDisabled={option ? option.value >= option.max : false}
							onPick={
								option
									? (count) => {
											const newValue = option.value + count;
											const updatedValue = newValue <= option.max ? newValue : option.max;
											onPick({ timerType, value: updatedValue });
									  }
									: undefined
							}
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
					hours: options && options.hr ? options.hr.value : undefined,
					minutes: options && options.min ? options.min.value : undefined,
					seconds: options && options.sec ? options.sec.value : undefined,
					milliseconds: options && options.ms ? options.ms.value : undefined
				}}
				spacing={spacing}
				p={spacing}
			/>

			<HStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={spacing}>
				{timerTypes.map((timerType) => {
					const option = options ? options[timerType] : undefined;
					return (
						<TimePickerControls
							key={timerType}
							timerType={timerType}
							mode='subtract'
							isDisabled={option ? option.value <= option.min : false}
							onPick={
								option
									? (count) => {
											const newValue = option.value - count;
											const updatedValue = newValue >= option.min ? newValue : option.min;
											onPick({ timerType, value: updatedValue });
									  }
									: undefined
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
