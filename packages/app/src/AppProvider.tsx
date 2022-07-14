import React, { useEffect } from 'react'

import { useI18n } from '@packages/i18n'
import { PureWrapper } from '@packages/components'

import { LanguageScope } from '@app/locales/languages'
import en from '@app/locales/languages/enUS.json'
import cn from '@app/locales/languages/zhCN.json'

const AppProvider: React.FC = props => {
  const { setDefaultLocale, store: i18nStore } = useI18n()

  useEffect(() => {
    // Some init code here.
    // SDK, Push Services, etc.

    setDefaultLocale('zh')
    i18nStore(en, 'en', LanguageScope)
    i18nStore(cn, 'zh', LanguageScope)
  }, [])

  return <PureWrapper {...props} />
}

export default AppProvider
