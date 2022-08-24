import { useContext, useMemo } from 'react'

import { UserType } from './types'
import { AuthenticationContext } from './context'

export const useAuthentication = () => {
  const { state, auth } = useContext(AuthenticationContext)

  const user = useMemo(() => state.user, [state.user])
  const isSignedIn = useMemo(() => !!user, [user])

  const signIn = (user: UserType) => {
    return auth.signIn(user)
  }

  const signOut = () => {
    auth.signOut()
  }

  return {
    isSignedIn,
    user,
    signIn,
    signOut,
  }
}
