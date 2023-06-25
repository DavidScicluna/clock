import { FC } from 'react';

import { ButtonIcon, useTheme } from '@davidscicluna/component-library';

import { HStack, useMediaQuery } from '@chakra-ui/react';

import { useSelector, useSpacing } from '../../../../../../common/hooks';
import ClearTimersButton from '../../../ClearTimersButton';
import ClearTimersIconButton from '../../../ClearTimersIconButton';
import CreateTimerButton from '../../../CreateTimerButton';
import CreateTimerIconButton from '../../../CreateTimerIconButton';

const TimersHeaderActions: FC = () => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
	const [isMd] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

	const timers = useSelector((state) => state.timers.data.timers);

	const spacing = useSpacing();

	return (
		<HStack width={!isSm && isMd ? '100%' : 'auto'} spacing={spacing}>
			{isSm ? (
				<CreateTimerIconButton size={isSm || isMd ? 'sm' : 'md'} />
			) : (
				<CreateTimerButton
					isFullWidth={isMd}
					renderLeft={(props) => <ButtonIcon {...props} icon='add' />}
					size={isSm || isMd ? 'sm' : 'md'}
				/>
			)}

			{timers.length > 0 ? (
				isSm ? (
					<ClearTimersIconButton size={isSm || isMd ? 'sm' : 'md'} />
				) : (
					<ClearTimersButton
						isFullWidth={isMd}
						renderLeft={(props) => <ButtonIcon {...props} icon='delete' />}
						size={isSm || isMd ? 'sm' : 'md'}
					/>
				)
			) : null}
		</HStack>
	);
};

export default TimersHeaderActions;
