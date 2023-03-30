import { INDEX_DATE_TIME_FORMAT } from '../../../constants/date';
import dayjs from '../../../utils/dayjs';

/**
 * 	We need to convert incoming point to UTC time and return correct key. To do this we need to remove user's offset from time
 * @param point unix time is user time zone.
 */
export const getPointKey = (point: number | null | undefined) => {
  if (point) {
    const utcDate = dayjs
      .unix(point)
      .utcOffset(dayjs.unix(point).utcOffset() * -1);

    const key = utcDate.format(INDEX_DATE_TIME_FORMAT);

    return key;
  }

  return '';
};
