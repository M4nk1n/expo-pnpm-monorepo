import { combineProviders } from '@packages/shared'
import { KeyboardAvoidingProvider, SuspenseProvider, ToastProvider } from '@packages/components'

import NavigatorProvider from './navigation/NavigatorProvider'

const AppProviders: React.FC = ({ children }) =>
  combineProviders(
    [
      // order matters here, be careful!
      // if Provider A is using another Provider B, then A needs to appear below B.
      // (即外层组件放上面)
      SuspenseProvider,
      KeyboardAvoidingProvider,
      ToastProvider,
      NavigatorProvider,
    ],
    children
  )

export default AppProviders
