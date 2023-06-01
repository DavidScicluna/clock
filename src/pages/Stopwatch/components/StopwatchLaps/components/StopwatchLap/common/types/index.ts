import { StopwatchLap } from '../../../../../../common/types';

export type StopwatchLapProps = Omit<StopwatchLap, 'id'> & {
	isSubmitted?: boolean;
};
