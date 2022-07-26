import React from 'react'
import { NavigationContainer, Stack } from '@packages/navigation'

import Home from '@app/screens/home'
import Device from '@app/screens/device'

export default function NavigatorProvider() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{ title: 'Home' }} />

        <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
          <Stack.Screen name='Device' component={Device} options={{ title: 'Device' }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
