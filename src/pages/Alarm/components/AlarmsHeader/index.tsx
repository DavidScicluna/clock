import { FC } from 'react';

import { Headline, useTheme } from '@davidscicluna/component-library';

import { Text, useMediaQuery, VStack } from '@chakra-ui/react';

import { spacing } from '../..';
import AlarmsActions from '../AlarmsActions';

const AlarmsHeader: FC = () => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
	const [isMd] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

	return (
		<VStack width='100%' spacing={[spacing, spacing * 2]} pb={[spacing, spacing * 2]}>
			<Headline
				renderTitle={(props) => <Text {...props}>Alarms</Text>}
				// renderSubtitle={() => ()}
				renderRight={isSm || !isMd ? () => <AlarmsActions /> : undefined}
			/>

			{!isSm && isMd ? <AlarmsActions /> : undefined}
		</VStack>
	);
};

export default AlarmsHeader;
