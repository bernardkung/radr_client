import { string } from "zod/v4";

export function formatDate(dateStr:string) {
  const date = new Date(dateStr);

  const formatted = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(date);

  return formatted
}

export function formatMoney(moneyStr:string|number) {
  const moneyFloat = typeof(moneyStr) == "string" 
    ? parseFloat(moneyStr)
    : moneyStr 
  const roundFloat = Math.round((moneyFloat + Number.EPSILON) * 100) / 100
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(roundFloat);
  return formatted

  // const num = parseFloat(moneyStr);
  // if (isNaN(num)) return "Invalid amount";

  // const absFormatted = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  // }).format(Math.abs(num));

  // return num < 0 ? `$ -${absFormatted.slice(1)}` : absFormatted;

}