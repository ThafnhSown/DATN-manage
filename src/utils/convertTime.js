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