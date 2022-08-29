import React from 'react'

import { useI18n } from '@shared/i18n'
import { useTheme } from '@shared/theme'
import { Stack } from '@shared/navigation'

import { ScreenList } from '../constants'
import { LanguageScope } from '../locale'

import Agreement from '../screens/Agreement'
import Privacy from '../screens/Privacy'

const NavigatorProvider = () => {
  const { t } = useI18n()
  const { theme } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: theme.Color.LabelColor },
      }}
    >
      <Stack.Screen
        name={ScreenList.Agreement}
        component={Agreement}
        options={{ title: t('ServicesAgreement', LanguageScope) }}
      />
      <Stack.Screen
        name={ScreenList.Privacy}
        component={Privacy}
        options={{ title: t('PrivacyStatement', LanguageScope) }}
      />
    </Stack.Navigator>
  )
}

export default NavigatorProvider
