// Base Request
// See: https://reactnative.dev/docs/network

const parseJSON = (response: Response) => {
  const json = response.json()
  console.log('request response', json)
  return json
}

const checkStatus = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  throw response.toString()
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export const BaseRequest = async (
  url: string,
  options?: RequestInit
): Promise<{ success: boolean; data?: any; error?: any }> => {
  console.log('request url', url)
  console.log('request options', options)
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ success: true, data }))
    .catch(error => ({ success: false, error }))
}
