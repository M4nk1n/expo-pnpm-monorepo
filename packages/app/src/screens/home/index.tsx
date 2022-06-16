import React from 'react'
import { Observer, useLocalObservable } from 'mobx-react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

import { useNavigationProp } from '@packages/navigation'
import { useToast } from '@packages/components'

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

  const click = (deviceType: string) => {
    navigation.navigate('Device', { deviceType })
  }

  const testToast = (message: string) => {
    toast.show(message)
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text>Open up App.tsx to start working on your app!</Text>
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
      <Button onPress={() => testToast('success')} title='Click to test Toast' />
    </View>
  )
}

export default Home
