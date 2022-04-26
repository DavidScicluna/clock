import { Color } from '@davidscicluna/component-library';

import { CircularProgressProps, ColorMode } from '@chakra-ui/react';

import { Timer } from '../../common/types';

export type TimeProgressColor = Exclude<Color, 'transparent'>;

type Omitted = 'getValueText' | 'isIndeterminate' | 'size' | 'thickness' | 'trackColor';

export type TimeProgressProps = {
	color: TimeProgressColor;
	colorMode?: ColorMode;
	timer: Timer;
} & Omit<CircularProgressProps, Omitted>;
