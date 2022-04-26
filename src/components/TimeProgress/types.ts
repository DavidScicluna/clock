import { ReactNode } from 'react';

import { Color } from '@davidscicluna/component-library';

import { CircularProgressProps, ColorMode } from '@chakra-ui/react';

export type TimeProgressColor = Exclude<Color, 'transparent'>;

type Omitted = 'getValueText' | 'isIndeterminate' | 'size' | 'thickness' | 'trackColor';

export type TimeProgressProps = {
	children: ReactNode;
	color: TimeProgressColor;
	colorMode?: ColorMode;
} & Omit<CircularProgressProps, Omitted>;
