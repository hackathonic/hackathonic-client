const ONE_HOUR = 1;
const NONE = 0;

import moment from 'moment';

const buildDate = (date, hour = NONE, minute = NONE, duration = NONE) => {
  const time = moment(date).add(hour, 'hours').add(minute, 'minutes')
  return duration ? time.add(duration, 'hours') : time;
}

export const buildStartDate = (date, hour, minute) => {
  return buildDate(date, hour, minute).valueOf();
}

export const buildEndDate = (date, hour, minute, duration = ONE_HOUR) => {
  return buildDate(date, hour, minute, duration).valueOf();
}
