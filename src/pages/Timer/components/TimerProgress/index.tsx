import { FC, useEffect, useState } from 'react';

import { Badge, BadgeIcon, BadgeLabel, HoverOverlay, Tooltip } from '@davidscicluna/component-library';

// TODO: Replace all useBoolean & useConst to use the ds cl ones
import { Center, useBoolean, useConst, VStack } from '@chakra-ui/react';

import dayjs, { Dayjs } from 'dayjs';
import { useUpdateEffect } from 'usehooks-ts';

import { checkTimer } from '../../../../common/utils';
import TimeLabel from '../../../../components/TimeLabel';
import TimeProgress from '../../../../components/TimeProgress';
import { Timer } from '../../common/types';
import { getTimerFromSeconds } from '../../common/utils';

import { TimerProgressProps } from './common/types';

const TimerProgress: FC<TimerProgressProps> = ({ status, elapsed = 0, total = 0 }) => {
	const { hours, minutes, seconds } = useConst<Timer>(getTimerFromSeconds({ seconds: total }));

	const [elapsedTimer, setElapsedTimer] = useState<Timer>(getTimerFromSeconds({ seconds: total }));

	const [hasHours, setHasHours] = useBoolean();
	const [hasMinutes, setHasMinutes] = useBoolean();

	const [date, setDate] = useState<Dayjs>(dayjs(new Date()).add(hours, 'h').add(minutes, 'm').add(seconds, 's'));

	const handleCheck = (): void => {
		const totalTimer = getTimerFromSeconds({ seconds: total });
		const { hours: hasHours = false, minutes: hasMinutes = false } = checkTimer({ ...totalTimer, milliseconds: 0 });

		if (hasHours) {
			setHasHours.on();
		} else {
			setHasHours.off();
		}

		if (hasMinutes) {
			setHasMinutes.on();
		} else {
			setHasMinutes.off();
		}

		setElapsedTimer(getTimerFromSeconds({ seconds: elapsed }));
	};

	const handleDate = (): void => {
		if (status === 'start') {
			const { hours, minutes, seconds } = elapsedTimer;

			setDate(dayjs(new Date()).add(hours, 'h').add(minutes, 'm').add(seconds, 's'));
		}
	};

	useEffect(() => handleCheck(), [elapsed]);

	useUpdateEffect(() => handleDate(), [status]);

	return (
		<VStack width='100%' height='100%' alignItems='stretch' justifyContent='stretch' spacing={4}>
			<HoverOverlay>
				{({ isHovering }) => (
					<Tooltip
						color='gray'
						aria-label='Timer will on Date (tooltip)'
						label={`Timer will end on ${date.format('ddd, MMM D, YYYY h:mm A')}`}
						placement='top'
						isOpen={status === 'start' && isHovering}
						isDisabled={status !== 'start'}
					>
						<Center opacity={status === 'pause' ? 0.5 : 1}>
							<Badge size='sm'>
								<BadgeIcon icon='notifications' />
								<BadgeLabel>{date.format('h:mm A')}</BadgeLabel>
							</Badge>
						</Center>
					</Tooltip>
				)}
			</HoverOverlay>

			<TimeProgress min={0} max={total} value={elapsed}>
				<TimeLabel
					timer={{ ...elapsedTimer, milliseconds: 0 }}
					options={{ hours: hasHours, minutes: hasMinutes, milliseconds: false }}
				/>
			</TimeProgress>
		</VStack>
	);
};

export default TimerProgress;
