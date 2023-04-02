import { FC, useState, useCallback, useEffect } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';
import { useTheme, getColor } from '@davidscicluna/component-library';


import { getStopwatchLabel } from '../../../../common/utils';

import { LapProps } from './types';

const Lap: FC<LapProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const { index, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, status = 'default' } = props;

	const [time, setTime] = useState<string>('');
	const [color, setColor] = useState<string>(getColor({ theme, colorMode, type: 'text.secondary' }));

	const handleSetTime = useCallback((): void => {
		setTime(getStopwatchLabel({ hours, minutes, seconds, milliseconds }));
	}, [hours, minutes, seconds, milliseconds]);

	const handleSetColor = useCallback((): void => {
		setColor(
			getColor({
				theme,
				colorMode,
				type: status === 'default' ? 'text.secondary' : 'color',
				color: status === 'fastest' ? 'green' : status === 'slowest' ? 'red' : 'gray'
			})
		);
	}, [theme, colorMode, status]);

	useEffect(() => handleSetTime(), [hours, minutes, seconds, milliseconds]);

	useEffect(() => handleSetColor(), [status]);

	return (
		<HStack width='100%' justify='space-between'>
			<Text align='left' color={color} fontSize='lg' fontWeight='medium'>
				{`Lap ${index}`}
			</Text>

			<Text align='left' color={color} fontSize='lg' fontWeight='medium' fontFamily='mono'>
				{time}
			</Text>
		</HStack>
	);
};

export default Lap;
