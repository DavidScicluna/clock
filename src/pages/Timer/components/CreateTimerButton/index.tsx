import { FC } from 'react';

import { Button } from '@davidscicluna/component-library';

import CreateTimer from '../CreateTimer';

import { CreateTimerButtonProps } from './common/types';

const CreateTimerButton: FC<CreateTimerButtonProps> = (props) => {
	return (
		<CreateTimer
			renderAction={({ children, ...rest }) => (
				<Button {...props} {...rest}>
					{children}
				</Button>
			)}
		/>
	);
};

export default CreateTimerButton;
