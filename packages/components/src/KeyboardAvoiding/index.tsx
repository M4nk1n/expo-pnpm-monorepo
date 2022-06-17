import React, { useContext } from 'react'
import { KeyboardAvoidingView as RNKeyboardAvoidingView, Platform } from 'react-native'

export const KeyboardAvoidingViewContext = React.createContext({
  isPresentedModally: false,
  isVisible: true,
  /**
   * bottom offset is used when the screen is presented modally to account for
   * any extra padding at the bottom of the screen (i.e. added for safe area insets)
   */
  bottomOffset: 0,
})

export const KeyboardAvoidingProvider: React.FC = ({ children }) => {
  const { isVisible } = useContext(KeyboardAvoidingViewContext)

  return (
    <RNKeyboardAvoidingView
      enabled={isVisible}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      {children}
    </RNKeyboardAvoidingView>
  )
}
