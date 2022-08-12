import { useEffectOnce } from './useEffectOnce'

/**
 * Just modified version of useEffect that's executed only one time, at the mounting time.
 */
export const useEffectCleaner = (cleaner: () => void) => {
  useEffectOnce(() => cleaner)
}
