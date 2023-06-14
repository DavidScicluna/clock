import { FC } from 'react';

import {
	Badge,
	BadgeLabel,
	HoverOverlay,
	Tooltip,
	useConst,
	useGetThemeAppearance,
	useTheme
} from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { getWeekDayLabel } from '../../../../../../../../common/utils';

import { AlarmCardRepeatDayProps } from './common/types';

const AlarmCardRepeatDay: FC<AlarmCardRepeatDayProps> = ({ day, isActive }) => {
	const theme = useTheme();

	const { color } = useGetThemeAppearance();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
	const [isMd] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

	const fullLabel = useConst<string>(getWeekDayLabel({ day, format: 'full' }));
	const initialLabel = useConst<string>(getWeekDayLabel({ day, format: 'initial' }));

	return (
		<HoverOverlay key={day}>
			{({ isHovering }) => (
				<Tooltip
					color='gray'
					aria-label={`Repeat Alarmt on ${fullLabel} (tooltip)`}
					label={fullLabel}
					placement='top'
					isOpen={isHovering}
				>
					<Badge color={isActive ? color : 'gray'} isCompact isRound size={isSm ? 'xs' : isMd ? 'sm' : 'md'}>
						<BadgeLabel>{initialLabel}</BadgeLabel>
					</Badge>
				</Tooltip>
			)}
		</HoverOverlay>
	);
};

export default AlarmCardRepeatDay;
