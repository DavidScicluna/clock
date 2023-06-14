import { FC } from 'react';

import { HoverOverlay, IconButton, IconButtonIcon, Tooltip } from '@davidscicluna/component-library';

import CreateAlarm from '../CreateAlarm';

import { CreateAlarmIconButtonProps } from './common/types';

const CreateAlarmIconButton: FC<CreateAlarmIconButtonProps> = (props) => {
	return (
		<CreateAlarm
			renderAction={({ children, ...rest }) => (
				<HoverOverlay>
					{({ isHovering }) => (
						<Tooltip
							color='gray'
							aria-label={`${children} (tooltip)`}
							label={children}
							placement='top'
							isOpen={isHovering}
						>
							<IconButton {...props} {...rest} aria-label={children}>
								<IconButtonIcon icon='add_alarm' category='outlined' />
							</IconButton>
						</Tooltip>
					)}
				</HoverOverlay>
			)}
		/>
	);
};

export default CreateAlarmIconButton;
