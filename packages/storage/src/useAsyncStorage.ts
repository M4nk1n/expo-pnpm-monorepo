import AsyncStorage from '@react-native-async-storage/async-storage'
import type { KeyValuePair } from '@react-native-async-storage/async-storage/src/types'

export type KeyType = string | string[]

interface ReturnType {
  set: (value: string) => Promise<void>
  get: () => Promise<string | null>
  merge: (value: string) => Promise<void>
  remove: () => Promise<void>
  getAllKeys: () => Promise<readonly string[]>
  clear: () => Promise<void>
}

interface MultReturnType {
  set: (value: string[]) => Promise<void>
  get: () => Promise<readonly KeyValuePair[]>
  merge: (value: string[]) => Promise<void>
  remove: () => Promise<void>
  getAllKeys: () => Promise<readonly string[]>
  clear: () => Promise<void>
}

/**
 * A hooks-like interface of @react-native-async-storage/async-storage.
 *
 * @param key(optional) The key that was used to store the associated value.
 *
 * See: {@link https://react-native-async-storage.github.io/async-storage/docs/api/#getitem}
 *
 * Example:
 * ```
 * const userStore = useAsyncStorage("user")
 * userStore.set("Tom")               // set user with "Tom"
 * userStore.get().then(console.log)  // "Tom"
 * userStore.remove()                 // delete user
 *
 * const asyncStore = useAsyncStorage()
 * asyncStore.getAllKeys()  // ["user", "books", ...]
 * multiUserStore.clear()   // clear storage
 * ```
 */
function useAsyncStorage(key?: string): ReturnType

/**
 * A hooks-like interface of @react-native-async-storage/async-storage.
 *
 * @param key The array of key that was used to store the associated value.
 *
 * See: {@link https://react-native-async-storage.github.io/async-storage/docs/api/#multiget}
 *
 * Example:
 * ```
 * const multiUserStore = useAsyncStorage(["user1", "user2"])
 * multiUserStore.set(["Tom", "Sam"])       // set user with "Tom" & "Sam"
 * multiUserStore.get().then(console.log)   // [["user1", "Tom"], ["user2", "Sam"]]
 * multiUserStore.remove()                  // delete user1 & user2
 * ```
 */
function useAsyncStorage(key: string[]): MultReturnType

/**
 * A hooks-like interface of @react-native-async-storage/async-storage.
 *
 * @param key(optional) The key(or the array of key) that was used to store the associated value.
 *
 * See: {@link https://react-native-async-storage.github.io/async-storage/docs/api/#getitem}
 *
 * Example:
 * ```
 * const userStore = useAsyncStorage("user")
 * userStore.set("Tom")               // set user with "Tom"
 * userStore.get().then(console.log)  // "Tom"
 * userStore.remove()                 // delete user
 *
 * const multiUserStore = useAsyncStorage(["user1", "user2"])
 * multiUserStore.set(["Tom", "Sam"])       // set user with "Tom" & "Sam"
 * multiUserStore.get().then(console.log)   // [["user1", "Tom"], ["user2", "Sam"]]
 * multiUserStore.remove()                  // delete user1 & user2
 *
 * const asyncStore = useAsyncStorage()
 * asyncStore.getAllKeys()  // ["user", "books", ...]
 * multiUserStore.clear()   // clear storage
 * ```
 */
function useAsyncStorage(key?: KeyType): ReturnType | MultReturnType {
  function set(value: string): Promise<void>
  function set(value: string[]): Promise<void>
  function set(value: KeyType): Promise<void> {
    if (!!key) {
      if (typeof key === 'string') {
        return AsyncStorage.setItem(key, value as string)
      } else {
        return AsyncStorage.multiSet(
          key.map((k, idx) => [idx < value.length ? k : '', value[idx]]).filter(v => v[0] !== '') as [string, string][]
        )
      }
    }
    return Promise.reject('Not implemented')
  }

  function get(): Promise<string | null>
  function get(): Promise<readonly KeyValuePair[]>
  function get(): Promise<string | null> | Promise<readonly KeyValuePair[]> {
    if (!!key) {
      if (typeof key === 'string') {
        return AsyncStorage.getItem(key)
      } else {
        return AsyncStorage.multiGet(key)
      }
    }
    return Promise.resolve(null)
  }

  /**
   * Merging of existing and new values in a batch. Assumes that values are stringified JSON.
   * Once completed, invokes callback with errors (if any).
   * NOTE: This is not supported by all native implementations.
   * @param value array of <stringified JSON>
   */
  function merge(value: string): Promise<void>
  function merge(value: string[]): Promise<void>
  function merge(value: KeyType): Promise<void> {
    if (!!key) {
      if (typeof key === 'string') {
        return AsyncStorage.mergeItem?.(key, value as string) ?? Promise.reject('Not implemented')
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
      if (typeof key === 'string') {
        return AsyncStorage.removeItem(key)
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
