import React from 'react'
import type { ToastContainerProps, ToastProps } from '../types'

export interface ToastType {
  props: ToastContainerProps
  toasts: React.MutableRefObject<ToastProps[]>
  setToasts: React.Dispatch<React.SetStateAction<ToastProps[]>>
}

export const ToastContainerDefaultProps: ToastContainerProps = {
  type: 'normal',
  duration: 'short',
  placement: 'center',
  animationDuration: 250,
  animationType: 'slide-in',
}

export const ToastContext = React.createContext<ToastType>({} as ToastType)
