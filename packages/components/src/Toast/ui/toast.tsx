import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'

import { ToastProps, TOAST_DURATION_MAP } from '../types'

const { width } = Dimensions.get('window')

export const Toast: React.FC<ToastProps> = ({
  id,
  message = '',
  icon,
  type = 'normal',
  duration = 'short',
  placement = 'center',
  style,
  textStyle,
  animationDuration = 250,
  animationType = 'slide-in',
  visible,
  onPress,
  onDestroy = () => {
    /* do nothing. */
  },
  ...props
}) => {
  const toastDuration = TOAST_DURATION_MAP[duration]

  const [animation] = useState(new Animated.Value(0))
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: Platform.OS !== 'web',
      duration: animationDuration,
    }).start()

    closeTimeoutRef.current = setTimeout(() => {
      handleClose()
    }, toastDuration)

    return () => {
      closeTimeoutRef.current && clearTimeout(closeTimeoutRef.current)
    }
  }, [duration])

  // Handles hide & hideAll
  useEffect(() => {
    if (!visible) {
      // Unregister close timeout
      closeTimeoutRef.current && clearTimeout(closeTimeoutRef.current)

      // Close animation them remove from stack.
      handleClose()
    }
  }, [visible])

  const handleClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      useNativeDriver: Platform.OS !== 'web',
      duration: animationDuration,
    }).start(() => onDestroy())
  }

  let backgroundColor = ''
  switch (type) {
    case 'success':
      // backgroundColor = successColor || "rgb(46, 125, 50)"
      backgroundColor = 'rgb(46, 125, 50)'
      break
    case 'danger':
      // backgroundColor = dangerColor || "rgb(211, 47, 47)"
      backgroundColor = 'rgb(211, 47, 47)'
      break
    case 'warning':
      // backgroundColor = warningColor || "rgb(237, 108, 2)"
      backgroundColor = 'rgb(237, 108, 2)'
      break
    default:
      // backgroundColor = normalColor || "#333"
      backgroundColor = '#333'
  }

  const animationStyle: Animated.WithAnimatedObject<ViewStyle> = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: placement === 'bottom' ? [20, 0] : [-20, 0], // 0 : 150, 0.5 : 75, 1 : 0
        }),
      },
    ],
  }

  if (animationType === 'zoom-in') {
    animationStyle.transform?.push({
      scale: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.7, 1],
      }),
    })
  }

  return (
    <Animated.View style={[styles.container, animationStyle]}>
      {props.renderType && props.renderType[type] ? (
        props.renderType[type](props)
      ) : props.renderToast ? (
        props.renderToast(props)
      ) : (
        <TouchableWithoutFeedback
          disabled={!onPress}
          onPress={() => {
            onPress && onPress(id)
          }}
        >
          <View style={[styles.toastContainer, { maxWidth: (width / 10) * 9, backgroundColor }, style]}>
            {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
            {React.isValidElement(message) ? message : <Text style={[styles.message, textStyle]}>{message}</Text>}
          </View>
        </TouchableWithoutFeedback>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center' },
  toastContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  message: {
    color: '#fff',
    fontWeight: '500',
  },
  iconContainer: {
    marginRight: 5,
  },
})
