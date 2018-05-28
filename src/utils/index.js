import { getMinutes, getHours } from 'date-fns';

export const findCurrentMinuteInPixel = (cellWidth, minutesInOneCell = 15) => {
  const currentMinute = getMinutes(new Date());
  const currentHour = getHours(new Date());
  const lengthInOneMinute = parseInt(cellWidth, 10) / minutesInOneCell;
  const totalMinutesOfToday = currentHour * 60 + currentMinute;

  return lengthInOneMinute * totalMinutesOfToday;
}
