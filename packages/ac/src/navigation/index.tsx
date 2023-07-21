import React from 'react'
import { Stack } from '@shared/navigation'

import { ScreenList } from '../constants'
import Home from '../screens/Home'
import About from '../screens/About'

const NavigatorProvider = () => (
  <Stack.Navigator initialRouteName={ScreenList.Home}>
    <Stack.Screen name={ScreenList.Home} component={Home} options={{ title: '空调' }} />
    <Stack.Screen name={ScreenList.About} component={About} options={{ title: '关于设备' }} />
  </Stack.Navigator>
)

export default NavigatorProvider
