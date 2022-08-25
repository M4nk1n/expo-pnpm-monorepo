import { PropsWithChildren } from 'react'
import { CombineProviders } from '@shared/utils'

import AppProvider from './AppProvider'
import NavigatorProvider from './navigation'

const AppProviders: React.FC<PropsWithChildren> = ({ children }) =>
  CombineProviders(
    [
      // order matters here, be careful!
      // if Provider A is using another Provider B, then A needs to appear below B.
      // (即外层组件放上面)
      AppProvider,
      NavigatorProvider,
    ],
    children
  )

export default AppProviders
