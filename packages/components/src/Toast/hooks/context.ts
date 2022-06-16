import React from 'react'
import { ToastContainer } from '../ui/container'

export type ToastType = Pick<ToastContainer, 'show' | 'update' | 'hide' | 'hideAll'>

export const ToastContext = React.createContext({} as ToastType)
