import { StyleSheet } from 'react-native'

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
