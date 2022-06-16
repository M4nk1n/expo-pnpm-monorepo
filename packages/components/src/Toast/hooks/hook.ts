import { useContext } from 'react'
import { ToastType, ToastContext } from './context'

export const useToast = (): ToastType => useContext(ToastContext)
