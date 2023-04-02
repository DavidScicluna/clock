import { ColorMode } from '@chakra-ui/react';
import { ButtonProps } from '@davidscicluna/component-library';



export type DescriptionRef = HTMLDivElement | null;

export type ErrorProps = {
	color: ButtonProps['color'];
	colorMode: ColorMode;
	code: number;
	title: string;
	subtitle: string;
};
