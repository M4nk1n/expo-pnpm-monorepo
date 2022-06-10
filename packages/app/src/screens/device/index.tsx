/**
 * For: Nexh.js
 * React Native 不支持带参数的 dynamic import，所以直接分开写
 */
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { useRouteProp } from '@packages/navigation'
import { DevicePageProps } from '@/types/navigation'

const Device = () => {
  const navigation = useNavigation()
  const route = useRoute<useRouteProp<DevicePageProps>>()
  const [deviceModule, setDeviceModule] = useState<JSX.Element>(<View />)

  useEffect(() => {
    if (!route.params || !route.params.deviceType) {
      console.log(`deviceType is null`)
      navigation.goBack()
      return
    }
    import("@devices/" + route.params.deviceType + "/src/index")
      .then(({ default: DeviceModule }) =>
        setDeviceModule(<DeviceModule />)
      )
      .catch(err => {
        console.log(`device page error: ${err}`)
        navigation.goBack()
      })
  }, [])

  return deviceModule
}

export default Device
