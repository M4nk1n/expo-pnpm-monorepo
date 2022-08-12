import { Dispatch, SetStateAction, useState } from 'react'

interface CounterControllers {
  increment: () => void
  decrement: () => void
  reset: () => void
  setCount: Dispatch<SetStateAction<number>>
}

/**
 * A simple abstraction to play with a counter, don't repeat yourself.
 */
export const useCounter = (initialValue?: number): [number, CounterControllers] => {
  const [count, setCount] = useState(initialValue || 0)

  const increment = () => setCount(x => x + 1)
  const decrement = () => setCount(x => x - 1)
  const reset = () => setCount(initialValue || 0)

  return [count, { increment, decrement, reset, setCount }]
}
