import type { NavigationProp, RouteProp, StackScreenProps } from '@shared/navigation'

import { ScreenList } from '../constants'

export type StackParamList = {
  [key in ScreenList]: undefined
}

export type StackProps<T extends keyof StackParamList> = StackScreenProps<StackParamList, T>

export type NavigationProps<T extends keyof StackParamList> = NavigationProp<StackParamList, T>

export type ScreenProps<T extends keyof StackParamList> = RouteProp<StackParamList, T>
