import { ParamListBase, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export type NavigateProp = StackNavigationProp<any>
export type RoutePageProp<T extends ParamListBase> = RouteProp<{ params: T }, 'params'>
