import React from 'react'
import { Stack } from '@shared/navigation'

import { ScreenList } from '../constants'

import Agreement from '../screens/Agreement'
import Privacy from '../screens/Privacy'

const NavigatorProvider = () => (
  <Stack.Navigator>
    <Stack.Group screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenList.Agreement} component={Agreement} options={{ title: 'Services Agreement' }} />
      <Stack.Screen name={ScreenList.Privacy} component={Privacy} options={{ title: 'Privacy Statement' }} />
    </Stack.Group>
  </Stack.Navigator>
)

export default NavigatorProvider
