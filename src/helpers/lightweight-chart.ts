import {
  isBusinessDay,
  BusinessDay,
  Time,
  UTCTimestamp,
} from 'lightweight-charts';
import dayjs from '../utils/dayjs';

export const businessDayToString = ({ year, month, day }: BusinessDay) =>
  dayjs(new Date(year, month - 1, day));

export const buildDateFromTime = (time: Time) =>
  isBusinessDay(time) ? businessDayToString(time) : dayjs(time);

export const getPreviousYear = (time: Time) => {
  const date = buildDateFromTime(time);

  return dayjs(date).set('year', date.get('year') - 1);
};

export const getDateTimeUTCTimestamp = (unixDateString: string) => {
  const localeDate = dayjs.utc(unixDateString).local();

  return (Date.UTC(
    localeDate.get('year'),
    localeDate.get('M'),
    localeDate.get('D'),
    localeDate.get('h'),
    localeDate.get('m'),
    localeDate.get('s'),
    localeDate.get('ms')
  ) / 1000) as UTCTimestamp;
};
