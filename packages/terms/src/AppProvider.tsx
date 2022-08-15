import React from 'react'

import { useBoolean, useEffectOnce } from '@shared/hooks'
import { useI18n } from '@shared/i18n'
import { PureWrapper } from '@shared/components'

import { LanguageScope } from './locale'
import en from './locale/languages/enUS.json'
import cn from './locale/languages/zhCN.json'

const AppProvider: React.FC = props => {
  const [inited, { setTrue }] = useBoolean(false)
  const { store: i18nStore, checkStore: checkI18nStore } = useI18n()

  useEffectOnce(() => {
    try {
      checkI18nStore(LanguageScope)
      setTrue()
    } catch (e) {
      console.warn('missing i18n', e)
      // i18n init.
      i18nStore(en, 'en', LanguageScope)
      i18nStore(cn, 'zh', LanguageScope)

      setTimeout(setTrue, 100)
    }
  })

  if (!inited) {
    return null
  }
  return <PureWrapper {...props} />
}

export default AppProvider
