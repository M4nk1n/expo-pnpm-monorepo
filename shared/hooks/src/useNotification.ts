import { useEffect } from 'react'
import { DeviceEventEmitter } from 'react-native'

/**
 * 本地通知
 *
 * @param eventType Event Name
 * @param callback 收到事件后执行的函数，只发送事件的情况下可为空
 *
 *  * Example:
 * ```js
 * export default function Component() {
 *   const { fire } = useNotification("event", str => { console.log(str) })
 *   return <Button onPress={() => { fire("event notification") }} title='Click to fire notification' />
 * }
 * ```
 */
export const useNotification = <T>(eventType: string, callback?: (params?: T) => void) => {
  useEffect(() => {
    if (!callback) {
      return
    }

    console.log('Notification.addListener', eventType)
    const listener = DeviceEventEmitter.addListener(eventType, callback)

    return () => {
      console.log('Notification.removeListener', eventType)
      listener.remove()
    }
  }, [eventType, callback])

  const fire = (params?: T) => {
    DeviceEventEmitter.emit(eventType, params)
  }

  return { fire }
}

export const Notification = (eventType: string, params?: any) => {
  const fire = () => {
    DeviceEventEmitter.emit(eventType, params)
  }
  return { fire }
}
