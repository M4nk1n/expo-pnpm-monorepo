import React from 'react'
import { Stack } from '@shared/navigation'

import Home from '../screens/Home'
import About from '../screens/About'

const NavigatorProvider = () => (
  <Stack.Navigator initialRouteName='DeviceHome'>
    <Stack.Screen name='DeviceHome' component={Home} options={{ title: '空调' }} />
    <Stack.Screen name='DeviceAbout' component={About} options={{ title: '关于设备' }} />
  </Stack.Navigator>
)

export default NavigatorProvider
