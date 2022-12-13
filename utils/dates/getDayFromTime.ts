import {format} from 'date-fns/fp';

export default function getDayFromTime(nanoseconds: number, seconds: number) : string {
    const date = new Date(seconds * 1000 + nanoseconds);
    const formattedDate = format("yyyy-MM-dd", date);
    return formattedDate;
}