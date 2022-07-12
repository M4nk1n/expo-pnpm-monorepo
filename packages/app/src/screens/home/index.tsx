import React, { useCallback, useState } from 'react'
import { Observer, useLocalObservable } from 'mobx-react-lite'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

import { useAppState, useDimensions, useKeyboard } from '@packages/shared'
import { useI18n } from '@packages/i18n'
import { useNavigationProp } from '@packages/navigation'
import { useToast } from '@packages/components'

import { LanguageScope } from '../../locales/languages'
import Store from '../../store'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Home = () => {
  const navigation = useNavigation<useNavigationProp>()
  const localStore = useLocalObservable(() => Store.app)
  const toast = useToast()
  const dims = useDimensions()
  const { i18n, setLocale, t } = useI18n()

  const [loc, setLoc] = useState(i18n.defaultLocale)
  const [value, onChangeText] = useState('Multiline Placeholder')

  const onBackground = useCallback(() => {
    // do something
    console.log('Home.onBackground')
  }, [])
  const onForeground = useCallback(() => {
    // do something
    console.log('Home.onForeground')
  }, [])
  useAppState({ onForeground, onBackground })

  const onKeyboardShow = useCallback(() => {
    // do something
    console.log('Home.onKeyboardShow')
  }, [])
  const onKeyboardHide = useCallback(() => {
    // do something
    console.log('Home.onKeyboardHide')
  }, [])
  const { dismiss: keyboardDismiss } = useKeyboard({ onKeyboardShow, onKeyboardHide })

  const click = (deviceType: string) => {
    navigation.navigate('Device', { deviceType })
  }

  const testToast = (message: string) => {
    toast.show(message)
  }

  const dismissKeyboard = () => {
    keyboardDismiss()
  }

  const setOtherLocale = () => {
    if (loc === 'en') {
      setLoc('zh')
      setLocale('zh')
    } else {
      setLoc('en')
      setLocale('en')
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text>{t('hello', LanguageScope)} App.tsx to start working on your app!</Text>
      <Text>==========================================</Text>
      <Button onPress={() => click('ac')} title='Click to Ac' />
      <Button onPress={() => click('light')} title='Click to Light' />
      <Button onPress={() => click('other')} title='Click to Other' />

      <Text>==========================================</Text>
      <Observer>{() => <Text>localStore: {localStore.counter}</Text>}</Observer>
      <Observer>{() => <Text>Store: {Store.app.counter}</Text>}</Observer>
      <Button onPress={() => localStore.increment()} title='Click to increment' />
      <Button onPress={() => localStore.decrement()} title='Click to decrement' />

      <Text>==========================================</Text>
      <Button onPress={() => testToast(JSON.stringify(dims))} title='Click to print useDimensions()' />
      <Button onPress={() => testToast('success')} title='Click to test Toast' />

      <Text>===================================</Text>
      <Button onPress={setOtherLocale} title={`Click to change language`} />

      <Text>==========================================</Text>
      <Button onPress={dismissKeyboard} title='Click to dismiss keyboard' />
      <TextInput
        editable
        multiline
        maxLength={40}
        onChangeText={text => onChangeText(text)}
        value={value}
        style={{ height: 40, width: 300, margin: 12, padding: 10, borderWidth: 1 }}
      />
    </View>
  )
}

export default Home
