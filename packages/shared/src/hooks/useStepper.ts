import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'

interface Helpers {
  next: () => void
  previous: () => void
  reset: () => void
  isLast: boolean
  isFirst: boolean
  setStep: Dispatch<SetStateAction<number>>
}

/**
 * A simple abstraction to play with a stepper, don't repeat yourself.
 *
 * @param maxStep max of step
 * @returns [number, Helpers]
 */
export const useStepper = (maxStep: number): [number, Helpers] => {
  const [currentStep, setCurrentStep] = useState(1)

  const isLast = useMemo(() => currentStep >= maxStep, [currentStep, maxStep])

  const isFirst = useMemo(() => currentStep <= 1, [currentStep])

  const setStep = useCallback(
    step => {
      // Allow value to be a function so we have the same API as useState
      const newStep = step instanceof Function ? step(currentStep) : step

      if (newStep >= 1 && newStep <= maxStep) {
        setCurrentStep(newStep)
        return
      }

      throw new Error('Step not valid')
    },
    [maxStep, currentStep]
  )

  const next = useCallback(() => {
    if (!isLast) {
      setCurrentStep(step => step + 1)
    }
  }, [isLast])

  const previous = useCallback(() => {
    if (!isFirst) {
      setCurrentStep(step => step - 1)
    }
  }, [isFirst])

  const reset = useCallback(() => {
    setCurrentStep(1)
  }, [])

  return [currentStep, { next, previous, isLast, isFirst, setStep, reset }]
}
