import { useEffect, useRef } from 'react'

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

/**
 * Very similar to the useInterval hook, this React hook implements the native setTimeout function keeping the same interface.
 *
 * You can enable the timeout by setting `delay` as a number or disabling it using `null`.
 *
 * When the time finishes, the callback function is called.
 *
 * @param callback callback function
 * @param delay a delay (in milliseconds)
 *
 * Example:
 * ```
 * const [visible, setVisible] = useState(true)
 * const hide = () => setVisible(false)
 * useTimeout(hide, 5000)
 *
 *
 * const [time, setTime] = useState<number | null>(30000)
 * const [visible, setVisible] = useState(true)
 * const hide = () => setVisible(false)
 * useTimeout(hide, time)
 * setTime(0)       // call the function immediately
 * setTime(null)    // disable the timeout, and the callback function has not called.
 * ```
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const timeout = setTimeout(() => savedCallback.current(), delay)

    return () => clearTimeout(timeout)
  }, [delay])
}
