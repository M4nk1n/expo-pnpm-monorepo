import React from 'react'
import { combineProviders } from '@packages/shared'

import NavigatorProvider from './navigation/NavigatorProvider'

const AppProviders = ({ children }: { children?: React.ReactNode }) => combineProviders([NavigatorProvider], children)

export default AppProviders
