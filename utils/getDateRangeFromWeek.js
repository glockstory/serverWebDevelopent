const DATE_FORMAT = require('../constants/DateFormat');
const moment = require('moment');

function getDateRangeFromWeek(weekNumber, year) {
  const MONDAY = moment().day('Monday').year(year).isoWeek(weekNumber);
  const DAYS = [MONDAY];

  for (let i = 1; i < 7; i++) {
    const DAY = moment(MONDAY).add(i, 'days');
    DAYS.push(DAY);
  }

  return DAYS.map((day) => day.format(DATE_FORMAT));
}

module.exports = getDateRangeFromWeek;
