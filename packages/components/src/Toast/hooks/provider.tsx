import React, { FC, useEffect, useRef, useState } from 'react'
import { ToastContainer, Props } from '../ui/container'
import { ToastContext } from './context'

export const ToastProvider: FC<Props> = ({ children, ...props }) => {
  const toastRef = useRef(null)
  const [refState, setRefState] = useState({})

  useEffect(() => {
    setRefState(toastRef.current as any)
  }, [])

  return (
    <ToastContext.Provider value={refState as any}>
      {children}
      <ToastContainer ref={toastRef} {...props} />
    </ToastContext.Provider>
  )
}
