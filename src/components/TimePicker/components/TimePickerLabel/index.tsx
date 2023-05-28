import { FC } from 'react';

import { useGetColor, useGetThemeAppearance } from '@davidscicluna/component-library';

import { HStack, VStack } from '@chakra-ui/react';

import { spacing } from '../..';

import { TimePickerLabelProps } from './common/types';
import TimePickerLabelNumber from './components/TimePickerLabelNumber';
import TimerTypeCaptions from './components/TimerTypeCaptions';

const TimePickerLabel: FC<TimePickerLabelProps> = ({ types, values }) => {
	const { colorMode } = useGetThemeAppearance();

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
			<TimerTypeCaptions types={types} />

			<HStack
				width='100%'
				alignItems='stretch'
				justifyContent='space-evenly'
				divider={<TimePickerLabelNumber>:</TimePickerLabelNumber>}
				spacing={spacing}
			>
				{values.map((value, index) => (
					<TimePickerLabelNumber key={index}>{value < 10 ? `0${value}` : value}</TimePickerLabelNumber>
				))}
			</HStack>

			<TimerTypeCaptions types={types} />
		</VStack>
	);
};

export default TimePickerLabel;
