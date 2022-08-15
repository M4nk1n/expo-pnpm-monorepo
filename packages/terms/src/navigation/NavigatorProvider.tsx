import React from 'react'
import { Stack } from '@shared/navigation'

import Agreement from '../screens/Agreement'
import Privacy from '../screens/Privacy'

export default function NavigatorProvider() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Agreement' component={Agreement} options={{ title: 'Services Agreement' }} />
        <Stack.Screen name='Privacy' component={Privacy} options={{ title: 'Privacy Statement' }} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
