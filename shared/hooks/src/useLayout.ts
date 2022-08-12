import { useState, useCallback } from 'react'
import { LayoutChangeEvent } from 'react-native'

type LayoutType = (event: LayoutChangeEvent) => void

export const useLayout = () => {
  const [layout, setLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const onLayout = useCallback<LayoutType>(e => setLayout(e.nativeEvent.layout), [])

  return {
    onLayout,
    ...layout,
  }
}
