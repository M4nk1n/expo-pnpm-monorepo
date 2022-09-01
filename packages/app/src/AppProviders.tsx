import React, { PropsWithChildren } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { DimensionsProvider } from '@shared/hooks'
import { CombineProviders } from '@shared/utils'
import { I18nProvider } from '@shared/i18n'
import { ThemeProvider } from '@shared/theme'
import { KeyboardAvoidingViewProvider, StatusBarProvider, SuspenseProvider, ToastProvider } from '@shared/components'
import { AuthenticationProvider } from '@shared/authentication'

import AppProvider from './AppProvider'
import NavigatorProvider from './navigation'

const AppProviders: React.FC<PropsWithChildren> = ({ children }) =>
  CombineProviders(
    [
      // order matters here, be careful!
      // if Provider A is using another Provider B, then A needs to appear below B.
      // (即外层组件放上面)
      I18nProvider,
      ThemeProvider,
      AuthenticationProvider,
      SafeAreaProvider,
      DimensionsProvider, // uses: SafeAreaProvider
      SuspenseProvider,
      KeyboardAvoidingViewProvider,
      ToastProvider,
      AppProvider, // uses: GizSDKProvider
      StatusBarProvider,
      NavigatorProvider,
    ],
    children
  )

export default AppProviders
