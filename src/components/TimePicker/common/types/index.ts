import { IconButtonProps } from '@davidscicluna/component-library';

import { TimerTypeShort } from '../../../../common/types';

export type TimePickerOption = { min: number; max: number; value: number };
export type TimePickerOptions = Partial<Record<TimerTypeShort, TimePickerOption>>;

export type TimePickerOnPickProps = { type: TimerTypeShort; value: number };

export type TimePickerProps = Pick<IconButtonProps, 'size'> & {
	// timer: Timer;
	onPick: (props: TimePickerOnPickProps) => void;
	options?: TimePickerOptions;
};
