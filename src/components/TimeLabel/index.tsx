import { FC, useEffect, useState } from 'react';

import { FontSize } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import { compact } from 'lodash';

import { TimeLabelProps } from './common/types';
import Label from './components/Label';

const TimeLabel: FC<TimeLabelProps> = ({ timer, options }) => {
	const { hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = timer;
	const {
		hours: hasHours = true,
		minutes: hasMinutes = true,
		seconds: hasSeconds = true,
		milliseconds: hasMilliseconds = true
	} = options || {};

	const [captionFontSize, setCaptionFontSize] = useState<FontSize>('xs');
	const [valueFontSize, setValueFontSize] = useState<FontSize>('4xl');

	const handleCheckOptions = (): void => {
		const total = compact([hasHours, hasMinutes, hasSeconds, hasMilliseconds]).length;

		switch (total) {
			case 4: {
				setCaptionFontSize('sm');
				setValueFontSize('4xl');
				break;
			}
			case 3: {
				setCaptionFontSize('md');
				setValueFontSize('5xl');
				break;
			}
			default: {
				setCaptionFontSize('xl');
				setValueFontSize('7xl');
				break;
			}
		}
	};

	useEffect(() => handleCheckOptions(), [options]);

	return (
		<HStack
			divider={<Label caption='' captionSize={captionFontSize} value=':' valueSize={valueFontSize} />}
			spacing={2}
		>
			{hasHours && <Label caption='hr' captionSize={captionFontSize} value={hours} valueSize={valueFontSize} />}

			{hasMinutes && (
				<Label caption='min' captionSize={captionFontSize} value={minutes} valueSize={valueFontSize} />
			)}

			{hasSeconds && (
				<Label caption='sec' captionSize={captionFontSize} value={seconds} valueSize={valueFontSize} />
			)}

			{hasMilliseconds && (
				<Label caption='ms' captionSize={captionFontSize} value={milliseconds} valueSize={valueFontSize} />
			)}
		</HStack>
	);
};

export default TimeLabel;
