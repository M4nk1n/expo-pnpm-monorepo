import React, { useContext } from 'react'
import { StyleSheet, ViewStyle, KeyboardAvoidingView, Platform, Dimensions } from 'react-native'
import { ToastContext } from '../hooks/context'
import { Toast } from './toast'

const { height, width } = Dimensions.get('window')

export const ToastContainer: React.FC = () => {
  const {
    props: { offset, offsetTop, offsetBottom },
    toasts,
  } = useContext(ToastContext)

  const renderTopToasts = () => {
    const style: ViewStyle = {
      top: offsetTop || offset,
      justifyContent: 'flex-start',
      flexDirection: 'column-reverse',
    }
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        style={[styles.container, style]}
        pointerEvents='box-none'
      >
        {toasts.current
          .filter(t => t.placement === 'top')
          .map(toast => (
            <Toast key={toast.id} {...toast} />
          ))}
      </KeyboardAvoidingView>
    )
  }

  const renderCenterToasts = () => {
    const style: ViewStyle = {
      top: offsetTop || offset,
      height: height,
      width: width,
      justifyContent: 'center',
      flexDirection: 'column-reverse',
    }

    const data = toasts.current.filter(t => t.placement === 'center')
    const foundToast = data.length > 0

    if (!foundToast) {
      return null
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        style={[styles.container, style]}
        pointerEvents='box-none'
      >
        {toasts.current
          .filter(t => t.placement === 'center')
          .map(toast => (
            <Toast key={toast.id} {...toast} />
          ))}
      </KeyboardAvoidingView>
    )
  }

  const renderBottomToasts = () => {
    const style: ViewStyle = {
      bottom: offsetBottom || offset,
      justifyContent: 'flex-end',
      flexDirection: 'column',
    }
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        style={[styles.container, style]}
        pointerEvents='box-none'
      >
        {toasts.current
          .filter(t => !t.placement || t.placement === 'bottom')
          .map(toast => (
            <Toast key={toast.id} {...toast} />
          ))}
      </KeyboardAvoidingView>
    )
  }

  return (
    <>
      {renderTopToasts()}
      {renderCenterToasts()}
      {renderBottomToasts()}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    position: 'absolute',
    maxWidth: '100%',
    zIndex: 999999,
    elevation: 999999,
    alignSelf: 'center',
    ...(Platform.OS === 'web' ? { overflow: 'hidden' } : null),
  },
  message: {
    color: '#333',
  },
})
