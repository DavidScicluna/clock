import { FC } from 'react';

import { ButtonGroup, ButtonGroupItem, IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { PickerArrowsProps } from './common/types';

const PickerArrows: FC<PickerArrowsProps> = ({ type, isDisabled = true, onPick }) => {
	return (
		<ButtonGroup isAttached>
			<ButtonGroupItem index={0} total={2}>
				<IconButton
					aria-label={type === 'add' ? 'Add 1' : 'Subtract 1'}
					color='gray'
					isDisabled={isDisabled}
					onClick={() => onPick(1)}
					size='xl'
					variant='outlined'
				>
					<IconButtonIcon
						icon={type === 'add' ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
						category='outlined'
					/>
				</IconButton>
			</ButtonGroupItem>
			<ButtonGroupItem index={1} total={2}>
				<IconButton
					aria-label={type === 'add' ? 'Add 10' : 'Subtract 10'}
					color='gray'
					isDisabled={isDisabled}
					onClick={() => onPick(10)}
					size='xl'
					variant='outlined'
				>
					<IconButtonIcon
						icon={type === 'add' ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down'}
						category='outlined'
					/>
				</IconButton>
			</ButtonGroupItem>
		</ButtonGroup>
	);
};

export default PickerArrows;
