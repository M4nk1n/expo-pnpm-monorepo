import { StyleSheet } from 'react-native'
import { Themes } from '@shared/theme'

import light from './light.json'
import dark from './dark.json'

export const themes: Themes = { light, dark }

export const GlobalStyles = StyleSheet.create({
  FlexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Shadow: {
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
  },
  Mask: {
    backgroundColor: '#0000007F',
  },
})
