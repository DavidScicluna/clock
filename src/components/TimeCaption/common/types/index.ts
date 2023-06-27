import { Nullable } from '@davidscicluna/component-library';

import { TextProps } from '@chakra-ui/react';

import { TimeTypeShort } from '../../../../common/types';

export type TimeCaptionProps = Omit<TextProps, 'children'> & {
	timeType: TimeTypeShort;
};

export type TimeCaptionRef = Nullable<HTMLParagraphElement>;
