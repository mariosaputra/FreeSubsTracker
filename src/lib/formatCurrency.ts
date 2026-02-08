export const CURRENCIES = [
  { code: "USD", label: "$ USD" },
  { code: "EUR", label: "\u20AC EUR" },
  { code: "GBP", label: "\u00A3 GBP" },
  { code: "JPY", label: "\u00A5 JPY" },
  { code: "CAD", label: "$ CAD" },
  { code: "AUD", label: "$ AUD" },
  { code: "CHF", label: "Fr CHF" },
  { code: "CNY", label: "\u00A5 CNY" },
  { code: "INR", label: "\u20B9 INR" },
  { code: "BRL", label: "R$ BRL" },
  { code: "MXN", label: "$ MXN" },
  { code: "KRW", label: "\u20A9 KRW" },
  { code: "SGD", label: "$ SGD" },
  { code: "HKD", label: "$ HKD" },
  { code: "TWD", label: "$ TWD" },
  { code: "THB", label: "\u0E3F THB" },
  { code: "MYR", label: "RM MYR" },
  { code: "PHP", label: "\u20B1 PHP" },
  { code: "IDR", label: "Rp IDR" },
  { code: "VND", label: "\u20AB VND" },
] as const;

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
