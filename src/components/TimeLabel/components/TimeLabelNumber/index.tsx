import { FC, useEffect, useState } from 'react';

import { FontSize, useGetColor, useTheme } from '@davidscicluna/component-library';

import { Text, useMediaQuery } from '@chakra-ui/react';

import { TimeLabelNumberProps } from './common/types';

const TimeLabelNumber: FC<TimeLabelNumberProps> = ({ children, timerTypes, ...rest }) => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const [isLg] = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

	const [fontSize, setFontSize] = useState<FontSize>('4xl');

	const color = useGetColor({ color: 'gray', type: 'text.primary' });

	const handleGetFontSize = (): void => {
		let fontSize: FontSize;

		switch (timerTypes.length) {
			case 4: {
				if (isLg) {
					fontSize = '8xl';
					break;
				} else if (isMd) {
					fontSize = '7xl';
					break;
				} else if (isSm) {
					fontSize = '6xl';
					break;
				} else {
					fontSize = '4xl';
					break;
				}
			}
			case 3: {
				if (isMd) {
					fontSize = '8xl';
					break;
				} else if (isSm) {
					fontSize = '7xl';
					break;
				} else {
					fontSize = '5xl';
					break;
				}
			}
			default: {
				if (isMd) {
					fontSize = '9xl';
					break;
				} else if (isSm) {
					fontSize = '8xl';
					break;
				} else {
					fontSize = '7xl';
					break;
				}
			}
		}

		setFontSize(fontSize);
	};

	useEffect(() => handleGetFontSize(), [timerTypes, isSm, isMd, isLg]);

	return (
		<Text {...rest} align='center' color={color} fontSize={fontSize} fontWeight='semibold'>
			{children}
		</Text>
	);
};

export default TimeLabelNumber;
