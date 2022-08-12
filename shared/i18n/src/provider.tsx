import React, { PropsWithChildren, useRef } from 'react'
import { I18n } from 'i18n-js'

import { I18nContext } from './context'

export const I18nProvider: React.FC<PropsWithChildren> = ({ children }) => {
  /**
   * Something use a closure(setTimeout etc.),
   * therefore, when setTimeout is scheduled it uses the value of count at that exact moment in time,
   * which is the initial value.
   *
   * To solve this, use the useRef Hook:
   */
  const i18nRef = useRef<I18n>({} as I18n)
  i18nRef.current = new I18n()

  return <I18nContext.Provider value={{ i18n: i18nRef }}>{children}</I18nContext.Provider>
}
