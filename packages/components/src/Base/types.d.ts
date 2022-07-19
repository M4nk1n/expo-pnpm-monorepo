import { StyleProp, ViewStyle } from 'react-native'

export type SpacerProps = {
  [key: string]: any
}

export type StackProps = {
  style?: StyleProp<ViewStyle>
  [key: string]: any
}

export type DividerProps = {
  horizontal?: boolean
  width?: number
  height?: number
  color?: string
  style?: StyleProp<ViewStyle>
  [key: string]: any
}
