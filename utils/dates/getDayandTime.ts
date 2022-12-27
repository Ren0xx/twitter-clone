import {format} from 'date-fns/fp';

export default function getDayAndTime(nanoseconds: number, seconds: number) : string {
    const date = new Date(nanoseconds / 1000000 + seconds * 1000);
    const formattedDate = format("dd-MMM-yyyy · HH:mm", date);
    return formattedDate;
}