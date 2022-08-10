import React, { PropsWithChildren } from 'react'
import { Keyboard, Pressable } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'

export type KeyboardDismissWrapperProps = {
  flex?: boolean
  style?: StyleProp<ViewStyle>
}

export const KeyboardDismissWrapper: React.FC<PropsWithChildren<KeyboardDismissWrapperProps>> = ({
  children,
  flex = false,
  style,
}) => {
  return (
    <Pressable onPress={Keyboard.dismiss} style={[flex ? { flex: 1 } : {}, style]}>
      {children}
    </Pressable>
  )
}
