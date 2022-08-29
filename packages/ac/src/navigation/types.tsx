import type { NavigationProp, RouteProp, StackScreenProps } from '@shared/navigation'

type StackParamList = {
  DeviceHome: undefined
  DeviceAbout: undefined
}

export type StackProps<T extends keyof StackParamList> = StackScreenProps<StackParamList, T>
export type NavigationProps<T extends keyof StackParamList> = NavigationProp<StackParamList, T>
export type ScreenProps<T extends keyof StackParamList> = RouteProp<StackParamList, T>
