import type { ColorValue, ViewProps } from 'react-native'

export type SpacerProps = ViewProps

export type StackProps = ViewProps

export interface DividerProps extends ViewProps {
  horizontal?: boolean
  width?: number
  height?: number
  color?: ColorValue
}
