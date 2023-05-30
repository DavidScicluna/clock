import { FC } from 'react';

import { useGetColor, useGetThemeAppearance } from '@davidscicluna/component-library';

import { HStack, VStack } from '@chakra-ui/react';

import { spacing } from '../TimePicker';

import { TimeLabelProps } from './common/types';
import TimeLabelCaptions from './components/TimeLabelCaptions';
import TimeLabelNumber from './components/TimeLabelNumber';

const TimeLabel: FC<TimeLabelProps> = ({ types, timer }) => {
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
			<TimeLabelCaptions types={types} />

			<HStack
				width='100%'
				alignItems='stretch'
				justifyContent='space-evenly'
				divider={<TimeLabelNumber lineHeight={1}>:</TimeLabelNumber>}
				spacing={spacing}
			>
				{types.map((type, index) => {
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
						<TimeLabelNumber key={index} width='100%' lineHeight='normal'>
							{time}
						</TimeLabelNumber>
					);
				})}
			</HStack>

			<TimeLabelCaptions types={types} />
		</VStack>
	);
};

export default TimeLabel;
