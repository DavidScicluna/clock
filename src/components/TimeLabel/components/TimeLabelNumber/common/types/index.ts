import { TextProps } from '@chakra-ui/react';

import { TimeLabelProps } from '../../../../common/types';

export type TimeLabelNumberProps = Pick<TimeLabelProps, 'timerTypes'> & TextProps;
