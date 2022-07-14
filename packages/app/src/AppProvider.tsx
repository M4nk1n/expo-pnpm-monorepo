import React, { useLayoutEffect, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'

import { useI18n } from '@packages/i18n'
import { PureWrapper } from '@packages/components'

import { LanguageScope } from '@app/locales/languages'
import en from '@app/locales/languages/enUS.json'
import cn from '@app/locales/languages/zhCN.json'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync().catch(err => {
  /* reloading the app might trigger some race conditions, ignore them */
  console.warn('SplashScreen.preventAutoHideAsync error', err)
})

const AppProvider: React.FC = props => {
  const [appIsReady, setAppIsReady] = useState(false)
  const { setDefaultLocale, setLocale, store: i18nStore } = useI18n()

  useEffect(() => {
    const prepare = async () => {
      try {
        // Some init code here.
        // SDK, Push Services, etc.

        // i18n init.
        i18nStore(en, 'en', LanguageScope)
        i18nStore(cn, 'zh', LanguageScope)
        setDefaultLocale('zh')
        setLocale('zh')

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 5000))
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

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

  useLayoutEffect(() => {
    if (appIsReady) {
      hideSplash()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return <PureWrapper {...props} />
}

export default AppProvider
