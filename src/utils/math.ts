export const calculatePercentage = (num: number, den: number) => {
  const percentage = Number(num) / Number(den);

  return roundTo(percentage * 100);
};

export const roundTo = (num: number, roundoff: number = 2) => {
  return num.toFixed(roundoff);
};
