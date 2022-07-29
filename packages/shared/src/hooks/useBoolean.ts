import { Dispatch, SetStateAction, useCallback, useState } from 'react'

interface BooleanControllers {
  setValue: Dispatch<SetStateAction<boolean>>
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}

/**
 * A simple abstraction to play with a boolean, don't repeat yourself.
 */
export const useBoolean = (defaultValue?: boolean): [boolean, BooleanControllers] => {
  const [value, setValue] = useState(!!defaultValue)

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue(x => !x), [])

  return [value, { setValue, setTrue, setFalse, toggle }]
}
