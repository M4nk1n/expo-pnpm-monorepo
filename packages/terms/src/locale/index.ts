import { useCallback } from 'react'
import { useI18n } from '@shared/i18n'

import json from '../../package.json'

const LanguageScope = { scope: json.name }

const useLocalI18n = () => {
  const { t } = useI18n()
  const localT = useCallback(
    (key: string) => {
      return t(key, LanguageScope)
    },
    [t]
  )
  return { t: localT }
}

export { useLocalI18n, LanguageScope }
