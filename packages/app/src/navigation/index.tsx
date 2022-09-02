import React, { lazy } from 'react'
import { NavigationContainer, Stack } from '@shared/navigation'

const Terms = lazy(() => import('@packages/terms'))

import Home from '@app/screens/Home'
import Device from '@app/screens/Device'

const NavigatorProvider = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={Home} />

      <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
        <Stack.Screen name='Device' component={Device} />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
        <Stack.Screen name='Terms' component={Terms} />
      </Stack.Group>
    </Stack.Navigator>
  </NavigationContainer>
)

export default NavigatorProvider
