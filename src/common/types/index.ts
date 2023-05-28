export type TimerTypeShort = 'h' | 'm' | 's' | 'ms';
export type TimerTypeFull = 'hours' | 'minutes' | 'seconds' | 'milliseconds';

export type Timer = Record<TimerTypeFull, number>;
