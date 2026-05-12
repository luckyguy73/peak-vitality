import {eachDayOfInterval, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek} from 'date-fns';

/**
 * STANDARD MODE: Generates a 7x6 month grid (with padding)
 */
export const getMonthGrid = (date: Date) => {
    const start = startOfWeek(startOfMonth(date));
    const end = endOfWeek(endOfMonth(date));
    return eachDayOfInterval({ start, end });
};

/**
 * PROGRAM MODE: Generates only the days between two dates
 */
export const getProgramInterval = (start: Date, end: Date) => {
    return eachDayOfInterval({ start, end });
};

export const formatMonth = (date: Date) => format(date, 'MMMM yyyy');
