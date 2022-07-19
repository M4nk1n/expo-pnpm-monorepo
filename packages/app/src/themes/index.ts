import { StyleSheet } from 'react-native'
import { Themes } from '@packages/theme'

import light from './light.json'
import dark from './dark.json'

export const themes: Themes = { light, dark }

export const GlobalStyles = StyleSheet.create({
  FlexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Shadow: {
    shadowColor: '#333',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
  },
})
