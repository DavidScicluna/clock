import {
	BoxColor,
	BoxFilter,
	BoxFlexbox,
	BoxGradient,
	BoxGrid,
	BoxLayout,
	BoxOther,
	BoxPosition,
	BoxPseudo,
	BoxShadow,
	BoxTypography
} from '@davidscicluna/component-library';

import { StackProps } from '@chakra-ui/react';

import { Timer, TimerTypesShort } from '../../../../common/types';

type Omitted =
	| BoxColor
	| BoxGradient
	| BoxTypography
	| BoxLayout
	| BoxFlexbox
	| BoxGrid
	| BoxPosition
	| BoxShadow
	| BoxFilter
	| BoxPseudo
	| BoxOther
	| 'as'
	| 'children'
	| 'direction';

export type TimeLabelProps = Omit<StackProps, Omitted> & {
	timerTypes: TimerTypesShort;
	timer: Partial<Timer>;
	isLive?: boolean;
};
