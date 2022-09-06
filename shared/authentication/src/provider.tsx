import React, { PropsWithChildren, useEffect, useMemo } from 'react'

import { isSecureStoreAvailableAsync, useAsyncStorage, useSecureStore } from '@shared/storage'

import { Action, State, UserType } from './types'
import { AuthenticationContext } from './context'
import { Keys } from './constants'

export const AuthenticationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (_: State, action: Action) => {
      switch (action.type) {
        case 'restore':
        case 'sign_in':
          return { state: action.type, user: action.payload }
        default:
          return { state: action.type, user: undefined }
      }
    },
    { state: 'inited', user: undefined }
  )

  const userSecureStore = useSecureStore(Keys.SignedInUser)
  const userAsyncStore = useAsyncStorage(Keys.SignedInUser)

  const auth = useMemo(
    () => ({
      store: async (user: UserType) => dispatch({ type: 'restore', payload: user }),
      signIn: async (user: UserType) => {
        try {
          dispatch({ type: 'sign_in', payload: user })
          isSecureStoreAvailableAsync().then(available => {
            const userStore = available ? userSecureStore : userAsyncStore
            userStore.set(JSON.stringify(user))
          })
        } catch (e) {
          console.error('store token error', e)
        }
      },
      signOut: () => {
        try {
          dispatch({ type: 'sign_out' })
          isSecureStoreAvailableAsync().then(available => {
            const userStore = available ? userSecureStore : userAsyncStore
            userStore.remove()
          })
        } catch (e) {
          console.error('remove token store error', e)
        }
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        const isSecureStoreAvailable = await isSecureStoreAvailableAsync()
        const userStore = isSecureStoreAvailable ? userSecureStore : userAsyncStore
        const userStr = await userStore.get()
        if (!!userStr) {
          const user = JSON.parse(userStr) as UserType
          auth.store(user)
        }
      } catch (e) {
        // Restoring token failed
        console.warn('get token store error', e)
        const isSecureStoreAvailable = await isSecureStoreAvailableAsync()
        const userStore = isSecureStoreAvailable ? userSecureStore : userAsyncStore
        userStore.remove()
      }
    }

    bootstrapAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AuthenticationContext.Provider value={{ state, auth }}>{children}</AuthenticationContext.Provider>
}
