import { SuspenseProps as DSCLSuspenseProps } from '@davidscicluna/component-library';

export type SuspenseProps = Omit<DSCLSuspenseProps, 'renderError'>;
