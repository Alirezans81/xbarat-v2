function getNumber(_str) {
  var arr = (_str + "").split("");
  var out = [];
  for (var cnt = 0; cnt < arr.length; cnt++) {
    if (isNaN(arr[cnt]) === false) {
      out.push(arr[cnt]);
    }
  }
  return Number(out.join(""));
}
function addComma(number, returnsZero) {
  var num = getNumber(number);
  if (num === 0) {
    return returnsZero ? 0 : "";
  } else {
    return num.toLocaleString();
  }
}
const useAddComma = () => {
  return addComma;
};

const reverseRate = (number) => {
  const convertedNumber =
    !number || number === 0 || number === "" ? "" : (1 / number).toFixed(4);
  return convertedNumber;
};
const useReverseRate = () => {
  return reverseRate;
};

const removeComma = (string) => {
  return +string.replaceAll(",", "");
};

const useRemoveComma = () => {
  return removeComma;
};

export { useAddComma, useReverseRate, useRemoveComma };
