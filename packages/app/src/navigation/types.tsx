import type { NavigationProp, NavigatorScreenParams, RouteProp, StackScreenProps } from '@shared/navigation'
import type { StackParamList as TermsStackParamList } from '@packages/terms'

type StackParamList = {
  Home: undefined
  Device: {
    deviceType: string
    did: string
  }
  /**
   * 用户协议堆栈
   */
  Terms: NavigatorScreenParams<TermsStackParamList>
}

export type StackProps<T extends keyof StackParamList> = StackScreenProps<StackParamList, T>
export type NavigationProps<T extends keyof StackParamList> = NavigationProp<StackParamList, T>
export type ScreenProps<T extends keyof StackParamList> = RouteProp<StackParamList, T>
