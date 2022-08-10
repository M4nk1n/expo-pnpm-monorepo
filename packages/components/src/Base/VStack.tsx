import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'

import type { StackProps } from './types'

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'column',
  },
})

const VStack: React.FC<PropsWithChildren<StackProps>> = ({ style, ...prop }) => {
  return <View style={[styles.view, style]} {...prop} />
}

export { VStack }
