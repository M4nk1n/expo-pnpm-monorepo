import React from 'react'
import { StyleSheet, View } from 'react-native'

import type { StackProps } from './types'

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
  },
})

const HStack: React.FC<StackProps> = ({ style, ...prop }) => {
  return <View style={[styles.view, style]} {...prop} />
}

export { HStack }
