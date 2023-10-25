const limitSize = (file) => {
  if (file.size > 4194304) {
    return false;
  }
  return true;
};

const useLimitSize = () => {
  return limitSize;
};

export { useLimitSize };
