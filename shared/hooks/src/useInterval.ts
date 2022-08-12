import { useEffect, useRef } from 'react'

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

/**
 * Use setInterval in functional React component with the same API.
 *
 * You can also stop the timer passing null instead the delay or even, execute it right away passing 0.
 *
 * @param callback callback function
 * @param delay a delay (in milliseconds)
 */
export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const interval = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(interval)
  }, [delay])
}
