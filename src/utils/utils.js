export function percentDifference(a, b) {
  if (a === 0 && b === 0) {
    return 0;
  }

  const average = (a + b) / 2;
  if (average === 0) {
    return 0;
  }

  const difference = Math.abs(a - b);

  return Number(((difference / Math.abs(average)) * 100).toFixed(2));
}

export const capitalize = (str = '') =>
  str ? str[0].toUpperCase() + str.slice(1) : '';

export const getChangeStatus = (value) => {
  if (value > 0) {
    return 'positive';
  }
  if (value < 0) {
    return 'negative';
  }
  return 'neutral';
};

export const statusColor = {
  positive: 'green',
  negative: 'red',
  neutral: 'default',
};
