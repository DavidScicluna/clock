import { FC, useEffect, useState } from 'react';

import {
	Badge,
	BadgeIcon,
	BadgeLabel,
	HoverOverlay,
	Tooltip,
	useGetThemeAppearance,
	useTheme
} from '@davidscicluna/component-library';

import { Center, useMediaQuery } from '@chakra-ui/react';

import dayjs, { Dayjs } from 'dayjs';

import { getTimerFromSeconds } from '../../common/utils';

import { TimerCardDateProps } from './common/types';

const TimerCardDate: FC<TimerCardDateProps> = ({ elapsed, status }) => {
	const theme = useTheme();

	const { color } = useGetThemeAppearance();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
	const [isMd] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

	const [date, setDate] = useState<Dayjs>(dayjs(new Date()));

	const handleDate = (): void => {
		if (status === 'started') {
			const { hr = 0, min = 0, sec = 0 } = getTimerFromSeconds(elapsed);
			setDate(dayjs(new Date()).set('hour', hr).set('minute', min).set('second', sec));
		}
	};

	useEffect(() => handleDate(), [status]);

	return (
		<HoverOverlay>
			{({ isHovering }) => (
				<Tooltip
					color='gray'
					aria-label='Timer will on Date (tooltip)'
					label={`Timer will end on ${date.format('ddd, MMM D, YYYY hh:mm:ss A')}`}
					placement='top'
					isOpen={status === 'started' && isHovering}
					isDisabled={status !== 'started'}
				>
					<Center opacity={status === 'paused' ? 0.5 : 1}>
						<Badge
							color={status === 'started' ? color : 'gray'}
							isCompact
							isRound
							size={isSm ? 'xs' : isMd ? 'sm' : 'md'}
						>
							<BadgeIcon icon='notifications' />
							<BadgeLabel>{date.format('hh:mm:ss A')}</BadgeLabel>
						</Badge>
					</Center>
				</Tooltip>
			)}
		</HoverOverlay>
	);
};

export default TimerCardDate;
