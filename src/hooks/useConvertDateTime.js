const convertDateTime = (dateTime) => {
  let newFormat = new Date(dateTime);
  return (
    newFormat.getFullYear() +
    "/" +
    (newFormat.getMonth() + 1) +
    "/" +
    newFormat.getDate() +
    " " +
    (newFormat.getHours() < 10
      ? "0" + newFormat.getHours()
      : newFormat.getHours()) +
    ":" +
    (newFormat.getMinutes() < 10
      ? "0" + newFormat.getMinutes()
      : newFormat.getMinutes())
  );
};

const useConvertDateTime = () => {
  return convertDateTime;
};

const sortByCreateDate = (a, b) => {
  if (a && a.datetime_create && b && b.datetime_create) {
    if (new Date(a.datetime_create) < new Date(b.datetime_create)) {
      return 1;
    }
    if (new Date(a.datetime_create) > new Date(b.datetime_create)) {
      return -1;
    }
  }
  return 0;
};

const useSortByCreateDate = () => {
  return sortByCreateDate;
};

export { useConvertDateTime, useSortByCreateDate };
