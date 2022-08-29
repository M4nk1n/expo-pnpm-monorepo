/**
 * For: Nexh.js
 * React Native 不支持带参数的 dynamic import，所以直接分开写
 */
import React, { PropsWithChildren, useState } from 'react'

import { useNavigation, useRoute } from '@shared/navigation'
import { useEffectOnce } from '@shared/hooks'

// import type { DeviceScreenProps } from '@devices/main'
interface DeviceScreenProps {
  type: string
  did: string
}

import { ScreenProps } from '@app/navigation/types'

const Device = () => {
  const navigation = useNavigation()
  const route = useRoute<ScreenProps<'Device'>>()
  const { deviceType, did } = route.params
  const [deviceModule, setDeviceModule] = useState<React.FC<PropsWithChildren<DeviceScreenProps>>>()

  useEffectOnce(() => {
    if (!deviceType || !did) {
      console.log(`deviceType/did is null`)
      navigation.goBack()
      return
    }

    import('@devices/' + deviceType)
      .then(({ default: DeviceModule }) => setDeviceModule(() => <DeviceModule type={deviceType} did={did} />))
      .catch(err => {
        console.log(`device page error: ${err}`)
        navigation.goBack()
      })
  })

  return <>{deviceModule}</>
}

export default Device
