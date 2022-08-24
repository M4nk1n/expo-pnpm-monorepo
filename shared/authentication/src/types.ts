export type UserType = {
  token: string
  gizUser: {
    uid: string
    token: string
  }
}

export type ActionType = 'inited' | 'restore_token' | 'sign_in' | 'sign_out'

export type Action =
  | { type: 'inited' }
  | { type: 'restore_token'; payload: UserType }
  | { type: 'sign_in'; payload: UserType }
  | { type: 'sign_out' }

export interface State {
  state: ActionType
  user?: UserType
}

export interface AuthenticationContextProps {
  state: State
  auth: {
    store: (user: UserType) => Promise<void>
    signIn: (user: UserType) => Promise<void>
    signOut: () => void
  }
}
