import { TextProps } from '@chakra-ui/react';

export type TimeTextProps = Omit<TextProps, 'children'> & { children: string };
