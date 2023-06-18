import { FC } from 'react';

import { ButtonIcon, useTheme } from '@davidscicluna/component-library';

import { HStack, useMediaQuery } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import { spacing } from '../..';
import ClearAlarmsButton from '../ClearAlarmsButton';
import ClearAlarmsIconButton from '../ClearAlarmsIconButton';
import CreateAlarmButton from '../CreateAlarmButton';
import CreateAlarmIconButton from '../CreateAlarmIconButton';

const AlarmsActions: FC = () => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
	const [isMd] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

	const alarms = useSelector((state) => state.alarms.data.alarms);

	return (
		<HStack width={!isSm && isMd ? '100%' : 'auto'} spacing={spacing}>
			{isSm ? (
				<CreateAlarmIconButton size={isSm || isMd ? 'sm' : 'md'} />
			) : (
				<CreateAlarmButton
					isFullWidth={isMd}
					renderLeft={(props) => <ButtonIcon {...props} icon='add' />}
					size={isSm || isMd ? 'sm' : 'md'}
				/>
			)}

			{alarms.length > 0 ? (
				isSm ? (
					<ClearAlarmsIconButton size={isSm || isMd ? 'sm' : 'md'} />
				) : (
					<ClearAlarmsButton
						isFullWidth={isMd}
						renderLeft={(props) => <ButtonIcon {...props} icon='delete' />}
						size={isSm || isMd ? 'sm' : 'md'}
					/>
				)
			) : null}
		</HStack>
	);
};

export default AlarmsActions;
