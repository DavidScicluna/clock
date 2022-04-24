import { ButtonProps } from '@davidscicluna/component-library';

import { ColorMode } from '@chakra-ui/react';


export type DescriptionRef = HTMLDivElement | null;

export type ErrorProps = {
	color: ButtonProps['color'];
	colorMode: ColorMode;
	code: number;
	title: string;
	subtitle: string;
};
