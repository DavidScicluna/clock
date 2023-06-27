import { TextProps } from '@chakra-ui/react';

export type TimeDividerProps = Omit<TextProps, 'children'> & { isLive?: boolean };
