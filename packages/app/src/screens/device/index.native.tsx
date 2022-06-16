/**
 * For: Expo / React Native
 * React Native 不支持带参数的 dynamic import，所以直接分开写
 * See: https://github.com/facebook/metro/issues/52
 */
import React, { lazy } from 'react'
import { useRoute } from '@react-navigation/native'

import { DevicePageProps } from '@/types/navigation'
import { useRouteProp } from '@packages/navigation'

const deviceArray = {
  undefined: lazy(() => import('@devices/ac')),
  ac: lazy(() => import('@devices/ac')),
  light: lazy(() => import('@devices/light')),
}

const Device = () => {
  const route = useRoute<useRouteProp<DevicePageProps>>()
  const deviceType = route.params.deviceType
  const DeviceModule = deviceArray[`${deviceType}`] ?? deviceArray.undefined
  return <DeviceModule />
}

export default Device
