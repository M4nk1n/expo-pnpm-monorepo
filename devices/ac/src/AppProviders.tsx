import { PropsWithChildren } from 'react'
import { combineProviders } from '@packages/shared'

import NavigatorProvider from './navigation/NavigatorProvider'

const AppProviders: React.FC<PropsWithChildren> = ({ children }) =>
  combineProviders(
    [
      // order matters here, be careful!
      // if Provider A is using another Provider B, then A needs to appear below B.
      // (即外层组件放上面)
      NavigatorProvider,
    ],
    children
  )

export default AppProviders
