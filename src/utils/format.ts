// En dash character used for zero or empty values
export const EN_DASH = "\u2013"

/** Determine decimal precision for asset prices based on $1 threshold */
export function getPriceDecimalScale(price: number | string): number {
  const value = Number(price)

  // More than $1: 2 decimal places (e.g., BTC, ETH)
  // Less than $1: 4 decimal places (e.g., INIT)
  return Math.abs(value) >= 1 ? 2 : 4
}

/**
 * Formats a price value with appropriate decimal places
 * Returns EN_DASH for zero values
 * @param price - The price to format
 * @returns Formatted price string
 */
export function formatPrice(price: number | string): string {
  const value = Number(price)
  if (value === 0) return EN_DASH

  const dp = getPriceDecimalScale(value)
  return value.toLocaleString("en-US", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  })
}

/**
 * Formats a change percentage with + or - sign
 * @param change - The percentage change value
 * @returns Formatted change string (e.g., "+2.50%" or "-1.25%")
 */
export function formatChange(change: number): string {
  const formatted = change.toFixed(2)
  return change >= 0 ? `+${formatted}%` : `${formatted}%`
}
