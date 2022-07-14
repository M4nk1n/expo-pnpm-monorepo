import React from 'react'
import { StyleSheet, View } from 'react-native'

import { SpacerProps } from './types'

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
})

const Spacer: React.FC<SpacerProps> = props => {
  return <View style={styles.view} {...props} />
}

export { Spacer }
