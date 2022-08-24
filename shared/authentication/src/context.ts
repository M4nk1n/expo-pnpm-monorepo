import { createContext } from 'react'

import { AuthenticationContextProps } from './types'

export const AuthenticationContext = createContext<AuthenticationContextProps>({} as AuthenticationContextProps)
