import { FC } from 'react';

import { HoverOverlay, IconButton, IconButtonIcon, Tooltip } from '@davidscicluna/component-library';

import CreateTimer from '../CreateTimer';

import { CreateTimerIconButtonProps } from './common/types';

const CreateTimerIconButton: FC<CreateTimerIconButtonProps> = (props) => {
	return (
		<CreateTimer
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
								<IconButtonIcon icon='add' category='outlined' />
							</IconButton>
						</Tooltip>
					)}
				</HoverOverlay>
			)}
		/>
	);
};

export default CreateTimerIconButton;
