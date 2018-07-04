import { getMinutes, getHours } from 'date-fns';

export const getCurrentMinute = (currentHour, minuteInCurrentHour) => {
  const min = minuteInCurrentHour === 0 ? 0 : (minuteInCurrentHour || getMinutes(new Date()));
  const hour = currentHour === 0 ? 0 : (currentHour || getHours(new Date()));
  const currentMinute = hour * 60 + min;

  return currentMinute;
}

export const convertMinuteToRem = (minute, timetableCellWidth, minutesInOneCell = 15) => {
  const lengthInOneMinute = parseInt(timetableCellWidth, 10) / minutesInOneCell;
  const rem = lengthInOneMinute * minute;

  return rem;
}
