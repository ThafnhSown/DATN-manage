export const convertDate = (number) => {
    const object = new Date(number)
    const formattedDate = object.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
    return formattedDate
}