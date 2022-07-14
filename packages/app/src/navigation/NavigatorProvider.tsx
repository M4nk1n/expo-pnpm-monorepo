import React from 'react'
import { NavigationContainer, Stack } from '@packages/navigation'

import Home from '@app/screens/home'
import Device from '@app/screens/device'

export default function NavigatorProvider() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{ title: '主页' }} />
        <Stack.Screen
          name='Device'
          component={Device}
          options={{ title: '设备', presentation: 'modal', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
