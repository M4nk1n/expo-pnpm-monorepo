import { createContext } from 'react'
import { I18n } from 'i18n-js'

export interface I18nContextProps {
  i18n: React.MutableRefObject<I18n>
}

export const I18nContext = createContext<I18nContextProps>({} as I18nContextProps)
