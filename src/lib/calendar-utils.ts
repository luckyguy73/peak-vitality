import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format
} from 'date-fns';

/**
 * Generates an array of days to fill a 7x6 month grid.
 * This includes "padding" days from the previous and next months.
 */
export const getMonthGrid = (date: Date) => {
    const start = startOfWeek(startOfMonth(date));
    const end = endOfWeek(endOfMonth(date));

    return eachDayOfInterval({ start, end });
};

export const formatMonth = (date: Date) => format(date, 'MMMM yyyy');
