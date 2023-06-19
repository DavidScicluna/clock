import { ButtonProps } from '@davidscicluna/component-library';

import { TimerTypeShort } from '../../../../../../common/types';

export type TimePickerControlsProps = Pick<ButtonProps, 'isDisabled' | 'size'> & {
	timerType: TimerTypeShort;
	mode: 'add' | 'subtract';
	onPick?: (count: number) => void;
};
