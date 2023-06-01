import { FC } from 'react';

import {
	ButtonGroup,
	ButtonGroupItem,
	HoverOverlay,
	IconButton,
	IconButtonIcon,
	Tooltip,
	useConst
} from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { formatTimerType } from '../../../../common/utils';

import { TimePickerControlsProps } from './common/types';

const TimePickerControls: FC<TimePickerControlsProps> = ({ timerType, mode, isDisabled = true, onPick, size }) => {
	const fullType = useConst(formatTimerType({ timerType, format: 'full' }));

	return (
		<Center width='100%'>
			<ButtonGroup isAttached>
				<ButtonGroupItem index={0} total={2}>
					<HoverOverlay>
						{({ isHovering }) => (
							<Tooltip
								color='gray'
								aria-label={
									mode === 'add' ? `Add 1 ${fullType} (tooltip)` : `Subtract 1 ${fullType} (tooltip)`
								}
								label={mode === 'add' ? `Add 1 ${fullType}` : `Subtract 1 ${fullType}`}
								placement={mode === 'add' ? 'top' : 'bottom'}
								isOpen={!isDisabled && isHovering}
								isDisabled={isDisabled}
							>
								<IconButton
									aria-label={mode === 'add' ? `Add 1 ${fullType}` : `Subtract 1 ${fullType}`}
									color='gray'
									isDisabled={isDisabled}
									onClick={onPick ? () => onPick(1) : undefined}
									size={size}
									variant='outlined'
								>
									<IconButtonIcon
										icon={mode === 'add' ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
										category='outlined'
									/>
								</IconButton>
							</Tooltip>
						)}
					</HoverOverlay>
				</ButtonGroupItem>
				<ButtonGroupItem index={1} total={2}>
					<HoverOverlay>
						{({ isHovering }) => (
							<Tooltip
								color='gray'
								aria-label={
									mode === 'add'
										? `Add 10 ${fullType}s (tooltip)`
										: `Subtract 10 ${fullType}s (tooltip)`
								}
								label={mode === 'add' ? `Add 10 ${fullType}s` : `Subtract 10 ${fullType}s`}
								placement={mode === 'add' ? 'top' : 'bottom'}
								isOpen={!isDisabled && isHovering}
								isDisabled={isDisabled}
							>
								<IconButton
									aria-label={mode === 'add' ? `Add 10 ${fullType}s` : `Subtract 10 ${fullType}s`}
									color='gray'
									isDisabled={isDisabled}
									onClick={onPick ? () => onPick(10) : undefined}
									size={size}
									variant='outlined'
								>
									<IconButtonIcon
										icon={
											mode === 'add' ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down'
										}
										category='outlined'
									/>
								</IconButton>
							</Tooltip>
						)}
					</HoverOverlay>
				</ButtonGroupItem>
			</ButtonGroup>
		</Center>
	);
};

export default TimePickerControls;
