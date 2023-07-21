import React, { useCallback, useState } from 'react'
import { Button, ScrollView, Text, TextInput, View } from 'react-native'
import { Observer, useLocalObservable } from 'mobx-react-lite'

import { useToast, VStack } from '@shared/components'
import { useAppState, useDimensions, useKeyboard } from '@shared/hooks'
import { useI18n } from '@shared/i18n'
import { useStyles } from '@shared/theme'
import { useNavigation } from '@shared/navigation'

import { ScreenList } from '@packages/terms'

import { useLocalI18n } from '../../locale'
import Store from '../../store'
import { NavigationProps } from '../../navigation/types'

const Home = () => {
  const navigation = useNavigation<NavigationProps<'Home'>>()
  const localStore = useLocalObservable(() => Store.app)
  const toast = useToast()
  const dims = useDimensions()
  const { i18n, setLocale } = useI18n()
  const { t } = useLocalI18n()

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
    navigation.navigate('Device', { deviceType, did: 'did' })
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

  const checkTerms = (type: ScreenList) => {
    navigation.navigate('Terms', { screen: type })
  }

  const styles = useStyles(theme => ({
    page: {
      flex: 1,
      backgroundColor: theme.Color.BackgroundColor
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.Space.LargeSpace
    }
  }))

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.page}>
        <VStack style={styles.container}>
          <Text>{t('Hello')} App.tsx to start working on your app!</Text>
          <Text>==========================================</Text>
          <Button onPress={() => click('ac')} title='Click to Ac' />
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

          <Text>===================================</Text>
          <Button onPress={() => checkTerms(ScreenList.Agreement)} title={`Click to Term > Agreement`} />
          <Button onPress={() => checkTerms(ScreenList.Privacy)} title={`Click to Term > Privacy`} />

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
        </VStack>
      </ScrollView>
    </View>
  )
}

export default Home
