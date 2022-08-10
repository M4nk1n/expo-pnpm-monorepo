import React, { PropsWithChildren, useRef, useState } from 'react'
import type { ToastContainerProps, ToastProps } from '../types'
import { ToastContainer } from '../ui/container'
import { ToastContainerDefaultProps, ToastContext } from './context'

export const ToastProvider: React.FC<PropsWithChildren<ToastContainerProps>> = ({ children, ...props }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  /**
   * Something use a closure(setTimeout etc.),
   * therefore, when setTimeout is scheduled it uses the value of count at that exact moment in time,
   * which is the initial value.
   *
   * To solve this, use the useRef Hook:
   */
  const toastsRef = useRef<ToastProps[]>([])
  toastsRef.current = toasts

  return (
    <ToastContext.Provider value={{ props: { ...ToastContainerDefaultProps, ...props }, toasts: toastsRef, setToasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}
