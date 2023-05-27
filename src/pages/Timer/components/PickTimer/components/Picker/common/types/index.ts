export type PickerProps = {
	caption: string;
	minValue: number;
	maxValue: number;
	onPick: (num: number) => void;
	value?: number;
};
