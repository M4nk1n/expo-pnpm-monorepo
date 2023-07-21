/**
 * For: Expo / React Native
 * React Native 不支持带参数的 dynamic import，所以直接分开写
 * See: https://github.com/facebook/metro/issues/52
 */
import React, { lazy, PropsWithChildren } from 'react'

import { useRoute } from '@shared/navigation'

// import type { DeviceScreenProps } from '@devices/main'
interface DeviceScreenProps {
  type: string
  did: string
}

import { ScreenProps } from '../../navigation/types'

const deviceArray = {
  default: lazy(() => import('@packages/ac')),
  ac: lazy(() => import('@packages/ac'))
} as {
  [key: string]: React.LazyExoticComponent<React.FC<PropsWithChildren<DeviceScreenProps>>>
}

const Device = () => {
  const route = useRoute<ScreenProps<'Device'>>()
  const { deviceType, did } = route.params
  const DeviceModule = deviceArray[deviceType] ?? deviceArray.default
  return <DeviceModule type={deviceType} did={did} />
}

export default Device
