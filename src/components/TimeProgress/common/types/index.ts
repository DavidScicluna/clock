import { ReactNode } from 'react';

import { CircularProgressProps } from '@chakra-ui/react';

export type TimeProgressProps = {
	children: ReactNode;
} & Omit<CircularProgressProps, 'getValueText' | 'isIndeterminate' | 'size' | 'thickness' | 'trackColor'>;
