type PickerArrowsType = 'add' | 'subtract';

export type PickerArrowsProps = {
	type: PickerArrowsType;
	isDisabled: boolean;
	onPick: (count: number) => void;
};
