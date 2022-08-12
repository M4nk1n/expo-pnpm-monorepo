import { useCallback } from 'react'

import { useBoolean } from './useBoolean'
import { useCounter } from './useCounter'
import { useInterval } from './useInterval'

type CountdownOption = {
  /**
   * The countdown's starting number, initial value of the returned number.
   */
  startNumber: number

  /**
   * The countdown's stopping number. Pass `-Infinity` to decrease forever.
   * `0` by default.
   */
  stopNumber?: number

  /**
   * The countdown's interval, in milliseconds.
   * `1000` by default.
   */
  intervalMs?: number

  /**
   * `true` if the countdown is increment.
   * `false` by default.
   */
  isIncrement?: boolean
}

interface CountdownControllers {
  start: () => void
  stop: () => void
  reset: () => void
}

/**
 * A simple countdown implementation.
 * Support increment and decrement.
 *
 * @returns [count, isRunning, CountdownControllers]
 *
 * Example:
 * ```
 * const [count, isRunning, { start, stop, reset }] = useCountdown({ startNumber: 60, intervalMs: intervalValue })
 * ```
 */
export const useCountdown = ({
  startNumber,
  stopNumber = 0,
  intervalMs = 1000,
  isIncrement = false,
}: CountdownOption): [number, boolean, CountdownControllers] => {
  const [count, { increment, decrement, reset: resetCounter }] = useCounter(startNumber)

  /**
   * Note: used to control the useInterval
   * running: If true, the interval is running
   * start: Should set running true to trigger interval
   * stop: Should set running false to remove interval
   */
  const [isCountdownRunning, { setTrue: start, setFalse: stop }] = useBoolean(false)

  /**
   * Will set running false and reset the seconds to initial value
   */
  const reset = () => {
    stop()
    resetCounter()
  }

  const countdownCallback = useCallback(() => {
    if (count === stopNumber) {
      stop()
      return
    }

    if (isIncrement) {
      increment()
    } else {
      decrement()
    }
  }, [count, stopNumber, decrement, increment, isIncrement, stop])

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null)

  return [count, isCountdownRunning, { start, stop, reset }]
}
