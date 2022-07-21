import AsyncStorage from '@react-native-async-storage/async-storage'
import type { KeyValuePair } from '@react-native-async-storage/async-storage/src/types'

/**
 * A hooks-like interface of @react-native-async-storage/async-storage.
 *
 * @param key(optional) The array of key that was used to store the associated value.
 *
 * See: {@link https://react-native-async-storage.github.io/async-storage/docs/api/#getitem}
 *
 * Example:
 * ```
 * const userStore = useAsyncStorage(["user"])
 * userStore.set(["Tom"])  // set user with "Tom"
 * userStore.get().then(console.log)  // [["user", "Tom"]]
 * userStore.remove()   // delete user
 *
 * const multiUserStore = useAsyncStorage(["user1", "user2"])
 * multiUserStore.set(["Tom", "Sam"])  // set user with "Tom" & "Sam"
 * multiUserStore.get().then(console.log)  // [["user1", "Tom"], ["user2", "Sam"]]
 * multiUserStore.remove()   // delete user1 & user2
 *
 * const asyncStore = useAsyncStorage()
 * asyncStore.getAllKeys() // ["user", "books", ...]
 * multiUserStore.clear() // clear storage
 * ```
 */
const useAsyncStorage = <T extends string[]>(key?: T) => {
  const set = (value: T): Promise<void> => {
    if (!!key) {
      if (key.length === 1 && value.length > 0) {
        return AsyncStorage.setItem(key[0], value[0])
      } else if (key.length > 1 && value.length > 0) {
        return AsyncStorage.multiSet(
          key.map((k, idx) => [idx < value.length ? k : '', value[idx]]).filter(v => v[0] !== '') as [string, string][]
        )
      }
    }

    return Promise.reject('Not implemented')
  }

  const get = (): Promise<readonly KeyValuePair[] | string | null> => {
    if (!!key) {
      if (key.length === 1) {
        return new Promise((resolve, reject) => {
          AsyncStorage.getItem(key[0])
            // .then(res => resolve([[key[0], res]]))
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
      } else {
        return AsyncStorage.multiGet(key)
      }
    }
    return Promise.reject('Not implemented')
  }

  /**
   * Merging of existing and new values in a batch. Assumes that values are stringified JSON.
   * Once completed, invokes callback with errors (if any).
   * NOTE: This is not supported by all native implementations.
   * @param value array of <stringified JSON>
   */
  const merge = (value: T): Promise<void> => {
    if (!!key) {
      if (key.length === 1 && value.length > 0) {
        return AsyncStorage.mergeItem?.(key[0], value[0]) ?? Promise.reject('Not implemented')
      } else if (key.length > 1 && value.length > 0) {
        return (
          AsyncStorage.multiMerge?.(
            key.map((k, idx) => [idx < value.length ? k : '', value[idx]]).filter(v => v[0] !== '') as [
              string,
              string
            ][]
          ) ?? Promise.reject('Not implemented')
        )
      }
    }
    return Promise.reject('Not implemented')
  }

  const remove = (): Promise<void> => {
    if (!!key) {
      if (key.length === 1) {
        return AsyncStorage.removeItem(key[0])
      } else {
        return AsyncStorage.multiRemove(key)
      }
    }
    return Promise.reject('Not implemented')
  }

  /**
   * Returns all keys known to your App, for all callers, libraries, etc.
   * Once completed, invokes callback with errors (if any) and array of keys.
   */
  const getAllKeys = AsyncStorage.getAllKeys

  /**
   * Removes whole AsyncStorage data, for all clients, libraries, etc.
   */
  const clear = AsyncStorage.clear

  return { set, get, merge, remove, getAllKeys, clear }
}

export { useAsyncStorage, AsyncStorage, KeyValuePair }
