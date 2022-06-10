import React from 'react'
import { Stack } from '@packages/navigation'

import Home from '../screens/home'
import About from '../screens/about'

const NavigatorProvider = () =>
    <Stack.Navigator initialRouteName='DeviceHome'>
      <Stack.Screen name="DeviceHome" component={Home} options={{ title: "空调" }} />
      <Stack.Screen name="DeviceAbout" component={About} options={{ title: "关于设备" }} />
    </Stack.Navigator>

export default NavigatorProvider