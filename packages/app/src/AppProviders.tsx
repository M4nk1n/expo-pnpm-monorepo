import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { combineProviders, DimensionsProvider } from '@packages/shared'
import { KeyboardAvoidingProvider, SuspenseProvider, ToastProvider } from '@packages/components'

import NavigatorProvider from './navigation/NavigatorProvider'

const AppProviders = ({ children }: { children?: React.ReactNode }) =>
  combineProviders(
    [
      // order matters here, be careful!
      // if Provider A is using another Provider B, then A needs to appear below B.
      // (即外层组件放上面)
      SafeAreaProvider,
      DimensionsProvider, // uses: SafeAreaProvider
      SuspenseProvider,
      KeyboardAvoidingProvider,
      ToastProvider,
      NavigatorProvider,
    ],
    children
  )

export default AppProviders
