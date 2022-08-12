import { useCallback, useReducer, useRef } from 'react'
import { BaseRequest } from '@shared/utils'

import { useEffectOnce } from './useEffectOnce'

interface RequestOption extends RequestInit {
  /**
   * 是否立即执行本次请求，默认 false
   */
  runImmediately?: boolean
  /**
   * 是否使用 Cache，默认 false
   */
  useCache?: boolean
}

type ActionType = 'inited' | 'loading' | 'fetched' | 'error'

interface State<T> {
  state: ActionType
  data?: T
  error?: Error
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> = { type: 'loading' } | { type: 'fetched'; payload: T } | { type: 'error'; payload: Error }

/**
 * Here is a React Hook which aims to retrieve data on an API using the native Fetch API.
 * Used a reducer to separate state logic and simplify testing via functional style.
 *
 * @param url Url
 * @param options RequestOption
 * @returns [State<T>, () => void]
 *
 * Example:
 * ```js
 * const url = `http://jsonplaceholder.typicode.com/posts`
 * interface Post {
 *   id: number
 *   title: string
 *   body: string
 * }
 *
 * export default function Component_1() {
 *   const [{ state, data, error }, runFetch] = useFetch<Post[]>(url)
 *
 *   if (state === 'inited') return <Text>Component inited.</Text>
 *   if (error) return <Text>There is an error.</Text>
 *   if (!data) return(
 *     <Button onPress={runFetch} title='Click to run fetch' />
 *     <Text>Loading...</Text>
 *   )
 *   return <Text>{data[0].title}</Text>
 * }
 *
 * export default function Component_2() {
 *   const [{ state, data, error }] = useFetch<Post[]>(url, { runImmediately: true, useCache: true })
 *
 *   if (state === 'inited') return <Text>Component inited.</Text>
 *   if (error) return <Text>There is an error.</Text>
 *   if (!data) return <Text>Loading...</Text>
 *   return <Text>{data[0].title}</Text>
 * }
 *
 * ```
 */
export const useFetch = <T = unknown>(url?: string, options?: RequestOption): [State<T>, () => void] => {
  const { runImmediately = false, useCache = false, ...requestOptions } = options ?? {}

  const cache = useRef<Cache<T>>({})

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false)

  const initialState: State<T> = {
    state: 'inited',
    data: undefined,
    error: undefined,
  }

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { state: action.type, data: undefined, error: undefined }
      case 'fetched':
        return { state: action.type, data: action.payload, error: undefined }
      case 'error':
        return { state: action.type, data: undefined, error: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  const fetchData = useCallback(() => {
    // Do nothing if the url is not given
    if (!url) {
      return
    }

    dispatch({ type: 'loading' })

    // If a cache exists for this url, return it
    if (useCache && cache.current[url]) {
      dispatch({ type: 'fetched', payload: cache.current[url] })
      return
    }

    BaseRequest(url, requestOptions)
      .then(res => {
        if (res.success) {
          const data = res.data ?? {}
          cache.current[url] = data
          if (cancelRequest.current) {
            return
          }
          dispatch({ type: 'fetched', payload: data })
        } else {
          if (cancelRequest.current) {
            return
          }
          const error = res.error ?? {}
          dispatch({ type: 'error', payload: error as Error })
        }
      })
      .catch(err => {
        if (cancelRequest.current) {
          return
        }
        dispatch({ type: 'error', payload: err as Error })
        throw new Error(err)
      })
  }, [requestOptions, url, useCache])

  useEffectOnce(() => {
    cancelRequest.current = false

    if (runImmediately) {
      fetchData()
    }

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true
    }
  })

  return [state, fetchData]
}
