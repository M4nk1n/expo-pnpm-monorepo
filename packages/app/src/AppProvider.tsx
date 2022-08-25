import React, { PropsWithChildren } from 'react'
import * as SplashScreen from 'expo-splash-screen'

import { useBoolean, useEffectOnce, useIsomorphicLayoutEffect } from '@shared/hooks'
import { useI18n } from '@shared/i18n'
import { useTheme } from '@shared/theme'
import { PureWrapper } from '@shared/components'

import { themes } from '@app/themes'
import { LanguageScope } from '@app/locale'
import en from '@app/locale/languages/enUS.json'
import cn from '@app/locale/languages/zhCN.json'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(err => {
  /* reloading the app might trigger some race conditions, ignore them */
  console.warn('SplashScreen.preventAutoHideAsync error', err)
})

const AppProvider: React.FC<PropsWithChildren> = props => {
  const [isAppReady, { setTrue: setAppIsReady }] = useBoolean(false)
  const { setDefaultLocale, setLocale, store: i18nStore } = useI18n()
  const { initThemes } = useTheme()

  useEffectOnce(() => {
    const prepare = async () => {
      try {
        // Some init code here (dont need check privacy).

        // theme init
        initThemes(themes)

        // i18n init.
        i18nStore(en, 'en', LanguageScope)
        i18nStore(cn, 'zh', LanguageScope)
        setDefaultLocale('zh')
        setLocale('zh')

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 3000))
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady()
      }
    }

    prepare()
  })

  const hideSplash = async () => {
    try {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      console.log('SplashScreen.hideAsync')
      await SplashScreen.hideAsync()
    } catch (err) {
      console.warn('SplashScreen.hideAsync Error', err)
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (isAppReady) {
      hideSplash()
    }
  }, [isAppReady])

  if (!isAppReady) {
    return null
  }

  return <PureWrapper {...props} />
}

export default AppProvider
