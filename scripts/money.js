export function convertCents(number){
  let total = (Math.round(number) / 100).toFixed(2);
  return total;
}