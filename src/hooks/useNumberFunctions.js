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

const sortByBalance = (a, b) => {
  if (a && a.balance && b && b.balance) {
    if (+a.balance < +b.balance) {
      return 1;
    }
    if (+a.balance > +b.balance) {
      return -1;
    }
  }
  return 0;
};

const useSortByBalance = () => {
  return sortByBalance;
};

const calculateReverseRate = (rate, rate_multiplier, floating_number) => {
  return rate === 0
    ? 0
    : +((1 / +rate) * +rate_multiplier).toFixed(floating_number);
};

const useCalculateReverseRate = () => {
  return calculateReverseRate;
};

const calculateNotReversedRate = (rate, rate_multiplier, floating_number) => {
  return rate === 0
    ? 0
    : +(1 / (+rate / +rate_multiplier)).toFixed(floating_number);
};

const useCalculateNotReverseRate = () => {
  return calculateNotReversedRate;
};

const roundDown = (number, floating_number) => {
  if (floating_number === 0) {
    return Math.floor(number);
  } else {
    const aaa =  10 ** floating_number;
    console.log(aaa);
    return Math.floor(number * aaa) / aaa;
  }
};

export {
  useAddComma,
  useIsNumberFloat,
  useReverseRate,
  useRemoveComma,
  useSortByBalance,
  useCalculateReverseRate,
  useCalculateNotReverseRate,
  roundDown,
};
