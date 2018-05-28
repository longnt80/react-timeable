import { getMinutes, getHours } from 'date-fns';

export const getCurrentMinute = () => {
  const minuteInCurrentHour = getMinutes(new Date());
  const currentHour = getHours(new Date());
  const currentMinute = currentHour * 60 + minuteInCurrentHour;

  return currentMinute;
}

export const convertMinuteToRem = (minute, cellWidth, minutesInOneCell = 15) => {
  const lengthInOneMinute = parseInt(cellWidth, 10) / minutesInOneCell;
  const rem = lengthInOneMinute * minute;

  return rem;
}
