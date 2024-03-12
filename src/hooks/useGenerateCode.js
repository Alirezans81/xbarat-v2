function generateRandomNumberWithDigits(num) {
  let result = "";
  for (let i = 0; i < num; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return parseInt(result, 10) + "";
}

const useGenerateCode = () => {
  return generateRandomNumberWithDigits;
};

export { useGenerateCode };
