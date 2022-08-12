import React, { useCallback } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { useAppState, useDimensions } from '@shared/hooks'
import { useToast } from '@shared/components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const About = () => {
  const toast = useToast()
  const dims = useDimensions()

  const [value, onChangeText] = React.useState('Multiline Placeholder')

  const onBackground = useCallback(() => {
    // do something
    console.log('Device.About.onBackground')
  }, [])
  const onForeground = useCallback(() => {
    // do something
    console.log('Device.About.onForeground')
  }, [])
  useAppState({ onForeground, onBackground })

  const testToast = (message: string) => {
    toast.show(message)
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text>I am device(ac) - about page!</Text>
      <Text>==========================================</Text>
      <Button onPress={() => testToast(JSON.stringify(dims))} title='Click to print useDimensions()' />
      <Button onPress={() => testToast('success')} title='Click to test Toast' />

      <Text>==========================================</Text>
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

export default About
