import { FC } from 'react';

import { Button } from '@davidscicluna/component-library';

import ClearAlarms from '../ClearAlarms';

import { ClearAlarmsButtonProps } from './common/types';

const ClearAlarmsButton: FC<ClearAlarmsButtonProps> = (props) => {
	return (
		<ClearAlarms
			renderAction={({ children, ...rest }) => (
				<Button {...props} {...rest}>
					{children}
				</Button>
			)}
		/>
	);
};

export default ClearAlarmsButton;
