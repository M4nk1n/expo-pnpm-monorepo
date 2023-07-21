import { createNavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

export * from '@react-navigation/native'
export * from '@react-navigation/stack'
export * from '@react-navigation/drawer'

// Explicitly type the variable/function
// It is a typescript bug when using pnpm.
// More detailed: https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189
const NavigationRef: ReturnType<typeof createNavigationContainerRef> = createNavigationContainerRef()
const Stack: ReturnType<typeof createStackNavigator> = createStackNavigator()
const Drawer: ReturnType<typeof createDrawerNavigator> = createDrawerNavigator()

export { NavigationRef, Stack, Drawer }
