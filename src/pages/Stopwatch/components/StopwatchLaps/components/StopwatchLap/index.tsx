import { FC, useEffect, useState } from 'react';

import { useGetColor } from '@davidscicluna/component-library';

import { HStack, Text } from '@chakra-ui/react';

import { getLabel } from '../../../../../../common/utils';

import { StopwatchLapProps } from './common/types';

const StopwatchLap: FC<StopwatchLapProps> = (props) => {
	const {
		index,
		hours = 0,
		minutes = 0,
		seconds = 0,
		milliseconds = 0,
		isSubmitted = false,
		status = 'default'
	} = props;

	const [time, setTime] = useState<string>(
		getLabel(
			{ hours, minutes, seconds, milliseconds },
			{ hours: !!hours, minutes: !!minutes, seconds: true, milliseconds: true }
		)
	);

	const color = useGetColor({
		type: status === 'default' ? 'text.secondary' : 'color',
		color: status === 'fastest' ? 'green' : status === 'slowest' ? 'red' : 'gray'
	});

	const handleSetTime = (): void => {
		setTime(
			getLabel(
				{ hours, minutes, seconds, milliseconds },
				{ hours: !!hours, minutes: !!minutes, seconds: true, milliseconds: true }
			)
		);
	};

	useEffect(() => handleSetTime(), [hours, minutes, seconds, milliseconds]);

	return (
		<HStack width='100%' justifyContent='space-between'>
			<Text align='left' color={color} fontSize='lg' fontWeight='medium'>
				{`Lap ${isSubmitted ? '#' : index}`}
			</Text>

			<Text align='left' color={color} fontSize='lg' fontWeight='medium' fontFamily='mono'>
				{time}
			</Text>
		</HStack>
	);
};

export default StopwatchLap;
