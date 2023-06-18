import { FC } from 'react';

import { ClearIconButton } from '@davidscicluna/component-library';

import ClearAlarms from '../ClearAlarms';

import { ClearAlarmsIconButtonProps } from './common/types';

const ClearAlarmsIconButton: FC<ClearAlarmsIconButtonProps> = (props) => {
	return (
		<ClearAlarms
			renderAction={({ children, ...rest }) => (
				<ClearIconButton {...props} {...rest} aria-label={children} label={children} icon='delete' />
			)}
		/>
	);
};

export default ClearAlarmsIconButton;
