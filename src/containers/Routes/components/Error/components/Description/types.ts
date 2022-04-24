import { ErrorProps } from '../../types';

export type DescriptionProps = Omit<ErrorProps, 'actions' | 'color' | 'code'>;
