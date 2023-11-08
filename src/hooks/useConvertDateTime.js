const convertDateTime = (dateTime) => {
  let newFormat = new Date(dateTime);
  return (
    newFormat.getFullYear() +
    "/" +
    newFormat.getMonth() +
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

export { useConvertDateTime };
