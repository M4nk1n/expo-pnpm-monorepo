import { SafeAreaProvider } from 'react-native-safe-area-context'
import { combineProviders, DimensionsProvider } from '@packages/shared'
import { I18nProvider } from '@packages/i18n'
import { ThemeProvider } from '@packages/theme'
import { KeyboardAvoidingProvider, SuspenseProvider, ToastProvider } from '@packages/components'

import NavigatorProvider from '@app/navigation/NavigatorProvider'
import AppProvider from '@app/AppProvider'

const AppProviders: React.FC = ({ children }) =>
  combineProviders(
    [
      // order matters here, be careful!
      // if Provider A is using another Provider B, then A needs to appear below B.
      // (即外层组件放上面)
      SafeAreaProvider,
      DimensionsProvider, // uses: SafeAreaProvider
      SuspenseProvider,
      KeyboardAvoidingProvider,
      I18nProvider,
      ThemeProvider,
      ToastProvider,
      AppProvider, // uses: GizSDKProvider
      NavigatorProvider,
    ],
    children
  )

export default AppProviders
