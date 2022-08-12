/**
 * For: Expo / React Native
 * React Native 不支持带参数的 dynamic import，所以直接分开写
 * See: https://github.com/facebook/metro/issues/52
 */
import React, { lazy } from 'react'

import { useRoute, RoutePageProp } from '@shared/navigation'

const deviceArray = {
  undefined: lazy(() => import('@packages/ac')),
  ac: lazy(() => import('@packages/ac')),
  light: lazy(() => import('@packages/light')),
}

const Device = () => {
  const route = useRoute<RoutePageProp<DevicePageProps>>()
  const deviceType = route.params.deviceType
  const DeviceModule = deviceArray[`${deviceType}`] ?? deviceArray.undefined
  return <DeviceModule />
}

export default Device
