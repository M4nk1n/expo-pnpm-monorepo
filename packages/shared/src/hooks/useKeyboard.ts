import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export interface KeyboardProps {
  onChange?: (status: boolean) => void
  onKeyboardShow?: () => void
  onKeyboardHide?: () => void
}

/**
 * Example:
 *
 *  const onKeyboardShow = useCallback(() => {
 *    // do something
 *    calcViewHeight()
 *  }, [])
 *
 *  const onKeyboardHide = useCallback(() => {
 *    // do something
 *    calcViewHeight()
 *  }, [])
 *
 *  useKeyboard({ onKeyboardShow, onKeyboardHide })
 *
 */
export const useKeyboard = ({ onKeyboardShow, onKeyboardHide }: KeyboardProps) => {
  const [keyboardShow, setKeyboardShow] = useState(false)

  useEffect(() => {
    const _handleKeyboardStateChange = (nextState: boolean) => {
      console.log('_handleKeyboardStateChange', nextState)

      if (nextState) {
        onKeyboardShow && onKeyboardShow()
      } else {
        onKeyboardHide && onKeyboardHide()
      }

      setKeyboardShow(nextState)
    }

    // See: https://docs.expo.dev/versions/v45.0.0/react-native/keyboard/#addlistener
    const showListener = Keyboard.addListener('keyboardWillShow', () => _handleKeyboardStateChange(true))
    const hideListener = Keyboard.addListener('keyboardDidHide', () => _handleKeyboardStateChange(false))

    return () => {
      showListener.remove()
      hideListener.remove()
    }
  }, [keyboardShow, onKeyboardShow, onKeyboardHide])

  const dismiss = () => {
    console.log('Dismiss Keyboard')
    Keyboard.dismiss()
  }

  return { keyboardShow, dismiss }
}
