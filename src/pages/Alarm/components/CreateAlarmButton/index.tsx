import { FC } from 'react';

import { Button } from '@davidscicluna/component-library';

import CreateAlarm from '../CreateAlarm';

import { CreateAlarmButtonProps } from './common/types';

const CreateAlarmButton: FC<CreateAlarmButtonProps> = (props) => {
	return (
		<CreateAlarm
			renderAction={({ children, ...rest }) => (
				<Button {...props} {...rest}>
					{children}
				</Button>
			)}
		/>
	);
};

export default CreateAlarmButton;
