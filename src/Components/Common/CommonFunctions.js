export const returnMinValue = (data, meth, value) => data.reduce((min, curr) => meth(curr[`${value}`]) < meth(min[`${value}`]) ? curr : min)[`${value}`];
export const returnMaxValue = (data, meth, value) => data.reduce((max, curr) => meth(curr[`${value}`]) > meth(max[`${value}`]) ? curr : max)[`${value}`];
export const returnAvgValue = (data, meth, value) => {
  const totalValue = data.reduce((total, curr) => total + meth(curr[`${value}`]), 0);
  const avgValue = Math.round((totalValue / data.length) * 100) / 100;

  return avgValue;
};