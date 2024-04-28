import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const generateEventsData = (isoDate, timeZone) => {
  const date = dayjs(isoDate).tz(timeZone);
  return {
    day: date.format('DD'),
    month: date.format('MMMM'),
    year: date.format('YYYY'),
    time: date.format('HH:mm'),
    weekday: date.format('dddd')
  };
};