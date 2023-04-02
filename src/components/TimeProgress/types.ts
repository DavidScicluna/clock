import { ReactNode } from 'react';

import { CircularProgressProps, ColorMode } from '@chakra-ui/react';
import { Color } from '@davidscicluna/component-library';


export type TimeProgressColor = Exclude<Color, 'transparent' | 'black' | 'white' | 'gray'>;

type Omitted = 'getValueText' | 'isIndeterminate' | 'size' | 'thickness' | 'trackColor';

export type TimeProgressProps = {
	children: ReactNode;
	color: TimeProgressColor;
	colorMode?: ColorMode;
} & Omit<CircularProgressProps, Omitted>;
