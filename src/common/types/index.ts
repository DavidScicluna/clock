export type TimerTypeShort = 'hr' | 'min' | 'sec' | 'ms';
export type TimerTypesShort = TimerTypeShort[];

export type TimerTypeFull = 'hours' | 'minutes' | 'seconds' | 'milliseconds';
export type TimerTypesFull = TimerTypeFull[];

export type Timer = Record<TimerTypeFull, number>;

export type WeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type TimeFormat = '12hr' | '24hr';
