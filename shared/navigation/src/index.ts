import { createNavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

export * from '@react-navigation/native'
export * from '@react-navigation/stack'
export * from '@react-navigation/drawer'

const NavigationRef = createNavigationContainerRef()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

export { NavigationRef, Stack, Drawer }
