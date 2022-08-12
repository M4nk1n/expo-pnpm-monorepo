import { EffectCallback, useEffect } from 'react'

/**
 * Just modified version of useEffect that's executed only one time, at the mounting time.
 */
export const useEffectOnce = (effect: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}
