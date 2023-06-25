import { FC } from 'react';

import { ClearIconButton } from '@davidscicluna/component-library';

import ClearTimers from '../ClearTimers';

import { ClearTimersIconButtonProps } from './common/types';

const ClearTimersIconButton: FC<ClearTimersIconButtonProps> = (props) => {
	return (
		<ClearTimers
			renderAction={({ children, ...rest }) => (
				<ClearIconButton {...props} {...rest} aria-label={children} label={children} icon='delete' />
			)}
		/>
	);
};

export default ClearTimersIconButton;
