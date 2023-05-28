import { IconButtonProps } from '@davidscicluna/component-library';

import { TimerTypeShort } from '../../../../../../common/types';

export type TimePickerControlsProps = Pick<IconButtonProps, 'isDisabled' | 'size'> & {
	type: TimerTypeShort;
	mode: 'add' | 'subtract';
	onPick?: (count: number) => void;
};
