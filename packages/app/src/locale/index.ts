import { useCallback } from 'react'
import { useI18n } from '@shared/i18n'

const LanguageScope = { scope: 'app' }

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
