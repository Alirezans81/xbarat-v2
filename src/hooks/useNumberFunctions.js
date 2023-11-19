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
function getIntegerPart(number) {
  let str = number + "";
  return str.split(".")[0];
}
function getFloatPart(number) {
  let str = number + "";
  return str.split(".")[1];
}
function addComma(number, returnsZero) {
  if (+number < 1000) {
    return number;
  } else {
    var num = getNumber(getIntegerPart(number));
    if (num === 0) {
      return returnsZero ? 0 : "";
    } else {
      return (
        num.toLocaleString() +
        (getFloatPart(number) ? "." + getFloatPart(number) : "")
      );
    }
  }
}

const useAddComma = () => {
  return addComma;
};

const isNumberFloat = (number) => {
  const result = getFloatPart(number);
  if (result) {
    return true;
  } else {
    return false;
  }
};
const useIsNumberFloat = () => {
  return isNumberFloat;
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
  if (string.length >= 3) {
    return +string.replaceAll(",", "");
  } else {
    return string;
  }
};

const useRemoveComma = () => {
  return removeComma;
};

export { useAddComma, useIsNumberFloat, useReverseRate, useRemoveComma };
