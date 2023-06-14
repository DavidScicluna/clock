import { FC } from 'react';

import { HStack } from '@chakra-ui/react';

import { AlarmCardRepeatProps } from './common/types';
import AlarmCardRepeatDay from './components/AlarmCardRepeatDay';

const AlarmCardRepeat: FC<AlarmCardRepeatProps> = ({ repeat = [], isActive }) => {
	return (
		<HStack
			flex={1}
			alignItems='center'
			justifyContent='flex-start'
			wrap='wrap'
			spacing={0.5}
			sx={{ opacity: isActive ? 1 : 0.5 }}
		>
			{repeat.map((day) => (
				<AlarmCardRepeatDay key={day} day={day} isActive={isActive} />
			))}
		</HStack>
	);
};

export default AlarmCardRepeat;
