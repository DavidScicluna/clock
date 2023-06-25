import { Space, useTheme } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

export const defaultSpacing: Space = 2;

const useSpacing = (): number => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
	// const [isMd] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

	return isSm ? defaultSpacing : defaultSpacing * 2;
};

export default useSpacing;
