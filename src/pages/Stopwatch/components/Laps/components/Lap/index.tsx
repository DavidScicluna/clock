import { FC, useState, useCallback, useEffect } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';

import { getTimerLabel } from '../../../../../../common/utils';

import { LapProps } from './types';

const Lap: FC<LapProps> = (props) => {
	const { colorMode } = useColorMode();

	const { index, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, status = 'default' } = props;

	const [time, setTime] = useState<string>('');
	const [color, setColor] = useState<string>('');

	const handleSetTime = useCallback(() => {
		setTime(getTimerLabel({ hours, minutes, seconds, milliseconds }));
	}, [hours, minutes, seconds, milliseconds]);

	const handleSetColor = useCallback(() => {
		/* TODO: Add updated handleHue */
		setColor(
			status === 'fastest'
				? `green.${colorMode === 'light' ? 500 : 400}`
				: status === 'slowest'
				? `red.${colorMode === 'light' ? 500 : 400}`
				: `gray.${colorMode === 'light' ? 400 : 500}`
		);
	}, [colorMode, status]);

	useEffect(() => handleSetTime(), [hours, minutes, seconds, milliseconds]);

	useEffect(() => handleSetColor(), [status]);

	return (
		<HStack width='100%' justify='space-between'>
			<Text align='left' color={color} fontSize='md' fontWeight='medium'>
				{`Lap ${index}`}
			</Text>

			<Text align='left' color={color} fontSize='md' fontWeight='medium'>
				{time}
			</Text>
		</HStack>
	);
};

export default Lap;
