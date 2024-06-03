export const convertDate = (number) => {
    const object = new Date(number)
    const formattedDate = object.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
    return formattedDate
}

export const listDaysInBetween = (startDateNumber, endDateNumber) => {
  const daysList = [];
  const startDate = new Date(startDateNumber);
  const endDate = new Date(endDateNumber);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
      daysList.push(new Date(currentDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }));
      currentDate.setDate(currentDate.getDate() + 1);
  }
  return daysList;
}

export const regexNumber = (num) => {
    
  const regex = /(\d)(?=(\d{3})+(?!\d))/g;
  const res = num.toString().replace(regex, '$1.');
  return res
}

const dayjs = require('dayjs');

export const convertSecondsToDayjs = (seconds) => {
    let now = dayjs();
    let startOfToday = dayjs().startOf('day');
    let result = startOfToday.add(seconds / 1000, 'second');

    return result;
}
