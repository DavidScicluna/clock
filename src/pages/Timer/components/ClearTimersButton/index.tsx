import { FC } from 'react';

import { Button } from '@davidscicluna/component-library';

import ClearTimers from '../ClearTimers';

import { ClearTimersButtonProps } from './common/types';

const ClearTimersButton: FC<ClearTimersButtonProps> = (props) => {
	return (
		<ClearTimers
			renderAction={({ children, ...rest }) => (
				<Button {...props} {...rest}>
					{children}
				</Button>
			)}
		/>
	);
};

export default ClearTimersButton;
