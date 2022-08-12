import * as SecureStore from 'expo-secure-store'

/**
 * Returns whether the SecureStore API is enabled on the current device. This does not check the app permissions.
 * @return Promise which fulfils witch boolean, indicating whether the SecureStore API is available on the current device. Currently this resolves true on iOS and Android only.
 */
const isSecureStoreAvailableAsync = SecureStore.isAvailableAsync

/**
 * A hooks-like interface of expo-secure-store.
 *
 * See: {@link https://docs.expo.dev/versions/latest/sdk/securestore/#securestoredeleteitemasynckey-options}
 *
 * Example:
 * ```
 * const userStore = useSecureStore("user")
 *
 * userStore.set("Tom")  // set user with Tom
 * userStore.get().then(console.log)  // Tom
 * userStore.remove()   // delete user SecureStore
 * ```
 *
 * @param key The key that was used to store the associated value.
 * @param options An SecureStoreOptions object.
 */
const useSecureStore = (key: string, options?: SecureStore.SecureStoreOptions) => {
  const set = (value: string) => SecureStore.setItemAsync(key, value, options)
  const get = () => SecureStore.getItemAsync(key, options)
  const remove = () => SecureStore.deleteItemAsync(key, options)

  return { set, get, remove }
}

export { isSecureStoreAvailableAsync, useSecureStore, SecureStore }
