import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { PickerProps } from './common/types';
import PickerArrows from './components/PickerArrows';
import PickerCaption from './components/PickerCaption';
import PickerLabel from './components/PickerLabel';

const Picker: FC<PickerProps> = ({ caption, minValue, maxValue, onPick, value = 0 }) => {
	return (
		<VStack align='center' justify='center' spacing={2}>
			<PickerCaption>{caption}</PickerCaption>

			<PickerArrows type='add' isDisabled={value >= maxValue} onPick={(count) => onPick(value + count)} />

			<PickerLabel>{value >= 10 ? value : `0${value}`}</PickerLabel>

			<PickerArrows type='subtract' isDisabled={value <= minValue} onPick={(count) => onPick(value - count)} />
		</VStack>
	);
};

export default Picker;
