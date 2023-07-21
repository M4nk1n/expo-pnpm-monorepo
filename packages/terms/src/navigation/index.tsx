import React from 'react'

import { useTheme } from '@shared/theme'
import { Stack } from '@shared/navigation'

import { ScreenList } from '../constants'
import { useLocalI18n } from '../locale'

import Agreement from '../screens/Agreement'
import Privacy from '../screens/Privacy'

const NavigatorProvider = () => {
  const { t } = useLocalI18n()
  const { theme } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: theme.Color.LabelColor }
      }}
    >
      <Stack.Screen name={ScreenList.Agreement} component={Agreement} options={{ title: t('ServicesAgreement') }} />
      <Stack.Screen name={ScreenList.Privacy} component={Privacy} options={{ title: t('PrivacyStatement') }} />
    </Stack.Navigator>
  )
}

export default NavigatorProvider
