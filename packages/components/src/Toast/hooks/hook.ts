import { useContext } from 'react'
import type { ToastOptions } from '../types'
import { ToastContext } from './context'

export const useToast = () => {
  const context = useContext(ToastContext)

  /**
   * Shows a new toast. Returns id
   */
  const show = (message: string | JSX.Element, toastOptions?: ToastOptions) => {
    const id = toastOptions?.id || Math.random().toString()
    const onDestroy = () => {
      toastOptions?.onClose && toastOptions?.onClose()
      context.setToasts(context.toasts.current.filter(t => t.id !== id))
    }
    requestAnimationFrame(() => {
      context.setToasts([
        {
          id,
          onDestroy,
          message,
          visible: true,
          onHide: () => hide(id),
          ...context.props,
          ...toastOptions,
        },
        ...context.toasts.current.filter(t => t.visible),
      ])
    })
    return id
  }

  /**
   * Updates a toast, To use this create you must pass an id to show method first, then pass it here to update the toast.
   */
  const update = (id: string, message: string | JSX.Element, toastOptions?: ToastOptions) => {
    context.setToasts(
      context.toasts.current.map(toast => (toast.id === id ? { ...toast, message, ...toastOptions } : toast))
    )
  }

  /**
   * Removes a toast from stack
   */
  const hide = (id: string) => {
    context.setToasts(context.toasts.current.map(t => (t.id === id ? { ...t, visible: false } : t)))
  }

  /**
   * Removes all toasts in stack
   */
  const hideAll = () => {
    context.setToasts(context.toasts.current.map(t => ({ ...t, visible: false })))
  }

  /**
   * Check if a toast is currently open
   */
  const isVisible = (id: string) => {
    return context.toasts.current.some(t => t.id === id && !!t.visible)
  }

  return { show, update, hide, hideAll, isVisible }
}
