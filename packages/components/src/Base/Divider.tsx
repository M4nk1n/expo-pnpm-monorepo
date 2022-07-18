import React from 'react'
import { View } from 'react-native'

import type { DividerProps } from './types'

const Divider: React.FC<DividerProps> = ({ horizontal = false, width = 10, height = 40, color = '#eee', ...prop }) => {
  const innerStyle = horizontal
    ? { borderBottom: `1px solid ${color}`, width, height: 1 }
    : { borderLeft: `1px solid ${color}`, width: 1, height }
  return (
    <View {...prop}>
      <View style={innerStyle} />
    </View>
  )
}

export { Divider }
