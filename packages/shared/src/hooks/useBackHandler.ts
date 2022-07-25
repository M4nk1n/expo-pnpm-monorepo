import { useEffect } from 'react'
import { BackHandler } from 'react-native'

/**
 * - **If one subscription returns true**, then subscriptions registered earlier will not be called.
 * - **If no subscription returns true or none are registered**, it programmatically invokes the default back button functionality to exit the app.
 * ```
 * @param handler subscription，返回 true 可以阻止调用系统返回事件
 */
export function useBackHandler(handler: () => boolean) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)

    return () => BackHandler.removeEventListener('hardwareBackPress', handler)
  }, [handler])
}
