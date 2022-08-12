import React from 'react'
import { StyleSheet, View } from 'react-native'

import type { DividerProps } from './types'

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const Divider: React.FC<DividerProps> = ({ horizontal = false, color = '#eee', width, height, style, ...prop }) => {
  return (
    <View
      style={[horizontal ? { flexDirection: 'row' } : { flexDirection: 'column' }, styles.container, style]}
      {...prop}
    >
      <View
        style={
          horizontal
            ? [{ backgroundColor: color, width, height: 1 }, !width ? { flex: 1 } : {}]
            : [{ backgroundColor: color, width: 1, height }, !height ? { flex: 1 } : {}]
        }
      />
    </View>
  )
}

export { Divider }
