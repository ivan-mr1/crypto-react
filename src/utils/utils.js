export function percentDifference(a, b) {
  if (a === 0 && b === 0) {
    return 0;
  }

  const average = (a + b) / 2;
  const difference = Math.abs(a - b);

  return Number(((difference / average) * 100).toFixed(2));
}
export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
