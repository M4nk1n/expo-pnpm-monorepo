/**
 * For: Nexh.js
 * React Native 不支持带参数的 dynamic import，所以直接分开写
 */
import React, { useState } from 'react'
import { View } from 'react-native'

import { useEffectOnce } from '@packages/shared'
import { useNavigation, useRoute, RoutePageProp } from '@packages/navigation'

const Device = () => {
  const navigation = useNavigation()
  const route = useRoute<RoutePageProp<DevicePageProps>>()
  const [deviceModule, setDeviceModule] = useState<JSX.Element>(<View />)

  useEffectOnce(() => {
    if (!route.params || !route.params.deviceType) {
      console.log(`deviceType is null`)
      navigation.goBack()
      return
    }
    import('@devices/' + route.params.deviceType + '/src/index')
      .then(({ default: DeviceModule }) => setDeviceModule(<DeviceModule />))
      .catch(err => {
        console.log(`device page error: ${err}`)
        navigation.goBack()
      })
  })

  return deviceModule
}

export default Device
