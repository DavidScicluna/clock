export type ItemProps = {
	caption: string;
	minValue: number;
	maxValue: number;
	value?: number;
	onClick: (num: number) => void;
};
