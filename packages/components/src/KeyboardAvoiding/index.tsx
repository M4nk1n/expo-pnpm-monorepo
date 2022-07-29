import React, { useContext, useState } from 'react'
import { KeyboardAvoidingView as RNKeyboardAvoidingView, Platform } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'

export type KeyboardAvoidingViewProps = {
  isVisible: boolean
  isPresentedModally: boolean
  /**
   * bottom offset is used when the screen is presented modally to account for
   * any extra padding at the bottom of the screen (i.e. added for safe area insets)
   */
  bottomOffset: number
}

export type KeyboardAvoidingViewContextProps = {
  value: KeyboardAvoidingViewProps
  setValue: React.Dispatch<React.SetStateAction<KeyboardAvoidingViewProps>>
}

export const KeyboardAvoidingViewContext = React.createContext<KeyboardAvoidingViewContextProps>({
  value: {
    isVisible: true,
    isPresentedModally: false,
    bottomOffset: 0,
  },
  setValue: () => {
    /* do nothing */
  },
})

export const KeyboardAvoidingViewProvider: React.FC = ({ children }) => {
  const [value, setValue] = useState<KeyboardAvoidingViewProps>({
    isVisible: true,
    isPresentedModally: false,
    bottomOffset: 0,
  })

  return (
    <KeyboardAvoidingViewContext.Provider value={{ value, setValue }}>{children}</KeyboardAvoidingViewContext.Provider>
  )
}

export const KeyboardAvoidingView: React.FC<{ style?: StyleProp<ViewStyle> }> = ({ children, style }) => {
  const {
    value: { isVisible },
  } = useContext(KeyboardAvoidingViewContext)

  return (
    <RNKeyboardAvoidingView enabled={isVisible} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={style}>
      {children}
    </RNKeyboardAvoidingView>
  )
}
