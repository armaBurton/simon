export const randoPatternGenerator = (arr) => {
  return [...arr, Math.ceil(Math.random() * 4)];
};

export const randoNumbo = (max) => {
  return [Math.ceil(Math.random() * max)];
};
