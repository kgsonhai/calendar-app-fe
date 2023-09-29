const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const getWeekdayIndex = (weekday) => {
  return weekdays.indexOf(weekday);
};

export const getWeekdayDate = (weekday) => {
  const currentDate = new Date();
  const currentWeekday = currentDate.getDay();
  const weekdayIndex = getWeekdayIndex(weekday);
  const date = new Date(currentDate);

  let diff;

  if (currentWeekday === 0) {
    diff = (weekdayIndex + 7 - currentWeekday) % 7;
    date.setDate(
      currentDate.getDate() + diff - (weekday !== weekdays[0] ? 7 : 0)
    );
  } else {
    diff =
      weekdayIndex - currentWeekday >= 0
        ? weekdayIndex - currentWeekday
        : -(currentWeekday - weekdayIndex);
    date.setDate(
      currentDate.getDate() +
        diff +
        (weekday === weekdays[0] ? 7 - currentWeekday : 0)
    );
  }

  return date;
};
