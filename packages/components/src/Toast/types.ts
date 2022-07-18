import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type ToastType = 'normal' | 'success' | 'danger' | 'warning' | string
export type ToastDuration = 'long' | 'short'
export type ToastPlacement = 'top' | 'bottom' | 'center'
export type ToastAnimationType = 'slide-in' | 'zoom-in'

export interface ToastOptions {
  /**
   * Id is optional, you may provide an id only if you want to update toast later using toast.update()
   */
  id?: string

  /**
   * Customize toast icon
   */
  icon?: JSX.Element

  /**
   * Toast types, You can implement your custom types with JSX using renderType method on ToastContainer.
   */
  type?: ToastType

  /**
   * How long toast will stay before it go away
   */
  duration?: ToastDuration

  /**
   * Customize when toast should be placed
   */
  placement?: ToastPlacement

  /**
   * Customize style of toast
   */
  style?: StyleProp<ViewStyle>

  /**
   * Customize style of toast text
   */
  textStyle?: StyleProp<TextStyle>

  /**
   * Customize how fast toast will show and hide
   */
  animationDuration?: number

  /**
   * Customize how toast is animated when added or removed
   */
  animationType?: ToastAnimationType

  /**
   * Register event for when toast is pressed. If you're using a custom toast you have to pass this to a Touchable.
   */
  onPress?(id?: string): void

  /**
   * Execute event after toast is closed
   */
  onClose?(): void

  /**
   * Payload data for custom toasts. You can pass whatever you want
   */
  data?: any
}

export interface ToastProps extends ToastOptions {
  message?: string | JSX.Element
  visible?: boolean
  renderToast?(toast: ToastProps): JSX.Element
  renderType?: { [type: string]: (toast: ToastProps) => JSX.Element }
  onHide?(): void
  onDestroy?(): void
}

export interface ToastContainerProps extends ToastOptions {
  offset?: number
  offsetTop?: number
  offsetBottom?: number
}
