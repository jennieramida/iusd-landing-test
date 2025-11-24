import { atom, useAtomValue, useSetAtom } from "jotai"

/**
 * Asset Prices Store
 * Manages real-time asset prices from SSE updates
 */

// Atom storing all asset prices
export const assetPricesAtom = atom<Record<string, number>>({})

// Update action for asset prices
const updateAssetPricesAtom = atom(null, (get, set, update: Record<string, number>) => {
  const current = get(assetPricesAtom)
  set(assetPricesAtom, { ...current, ...update })
})

/**
 * Hook to get all asset prices
 */
export function useAssetPrices() {
  return useAtomValue(assetPricesAtom)
}

/**
 * Hook to update asset prices (used by SSE handler)
 */
export function useUpdateAssetPrices() {
  return useSetAtom(updateAssetPricesAtom)
}
