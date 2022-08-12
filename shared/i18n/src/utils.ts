import { set } from 'lodash'
import type { I18n } from 'i18n-js/typings'

export const is = <T extends object>(v: any, k: string): v is T => {
  return k in v
}

export const loadTranslationsFromUrl = async (i18n: I18n, url: string) => {
  const response = await fetch(url)
  const translations = await response.json()
  i18n.store(translations)
}

export const flatToNestedObject = (target: { [key: string]: string }) => {
  const nested = {}
  Object.keys(target).forEach(path => set(nested, path, target[path]))
  return nested
}
