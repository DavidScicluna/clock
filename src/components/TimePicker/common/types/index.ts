import { IconButtonProps } from '@davidscicluna/component-library';

import { TimerTypeShort } from '../../../../common/types';

export type TimePickerOption = { minValue: number; maxValue: number; value: number };
export type TimePickerOptions = Partial<Record<TimerTypeShort, TimePickerOption>>;

type TimePickerOnPick = { type: TimerTypeShort; value: number };

export type TimePickerProps = Pick<IconButtonProps, 'size'> & {
	// timer: Timer;
	onPick: (props: TimePickerOnPick) => void;
	options?: TimePickerOptions;
};
