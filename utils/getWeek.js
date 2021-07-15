const getDateRangeFromWeek = require('./getDateRangeFromWeek');

const PERIODS = [
  '9:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  '19:00-20:00',
  '20:00-21:00',
];

function getWeek(activities, weekNumber, year) {
  const DAYS = getDateRangeFromWeek(weekNumber, year);

  const WEEK = DAYS.map((day) => {
    const DAY = {
      date: day,
      activities: {},
    };

    for (let i = 0; i < PERIODS.length; i++) {
      const PERIOD = PERIODS[i];
      const [PERIOD_START] = PERIOD.split('-');

      const FOUND_ACTIVITY = activities.find(
        (activity) =>
          activity.date === DAY.date &&
          activity.time.search(`${PERIOD_START}-`) !== -1
      );

      if (FOUND_ACTIVITY) {
        DAY.activities[FOUND_ACTIVITY.time] = FOUND_ACTIVITY;

        const PERIOD_END = FOUND_ACTIVITY.time.split('-')[1];

        const NEXT_PERIOD = PERIODS.find(
          (period) => period.search(`${PERIOD_END}-`) !== -1
        );

        if (NEXT_PERIOD) {
          i = PERIODS.indexOf(NEXT_PERIOD) - 1;
        } else {
          i = PERIODS.length;
        }
      } else {
        DAY.activities[PERIOD] = null;
      }
    }

    return DAY;
  });

  return WEEK;
}

module.exports = getWeek;
