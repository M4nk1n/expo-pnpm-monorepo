import { ParamListBase, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type NavigateProp = StackNavigationProp<any> | NativeStackNavigationProp<any>
export type RoutePageProp<T extends ParamListBase> = RouteProp<{ params: T }, 'params'>
