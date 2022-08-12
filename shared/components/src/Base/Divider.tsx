import React from 'react'
import { StyleSheet, View } from 'react-native'

import type { DividerProps } from './types'

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalInnerStyle: {
    height: 1,
    borderBottomWidth: 1,
  },
  verticalInnerStyle: {
    width: 1,
    borderLeftWidth: 1,
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
            ? [styles.horizontalInnerStyle, { borderColor: color, width }, !width ? { flex: 1 } : {}]
            : [styles.verticalInnerStyle, { borderColor: color, height }, !height ? { flex: 1 } : {}]
        }
      />
    </View>
  )
}

export { Divider }
