import { FC } from 'react';

import { Headline, useTheme } from '@davidscicluna/component-library';

import { Text, useMediaQuery, VStack } from '@chakra-ui/react';

import { useSpacing } from '../../../../common/hooks';

import TimersHeaderActions from './components/TimersHeaderActions';

const TimersHeader: FC = () => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
	const [isMd] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

	const spacing = useSpacing();

	return (
		<VStack width='100%' spacing={spacing} pb={spacing}>
			<Headline
				renderTitle={(props) => <Text {...props}>Timers</Text>}
				// renderSubtitle={() => ()}
				renderRight={isSm || !isMd ? () => <TimersHeaderActions /> : undefined}
			/>

			{!isSm && isMd ? <TimersHeaderActions /> : undefined}
		</VStack>
	);
};

export default TimersHeader;
