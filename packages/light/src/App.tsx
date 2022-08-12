import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const App = (): JSX.Element => {
  useEffect(() => {
    console.log('device/light init.')
  }, [])

  return (
    <View style={styles.container}>
      <Text>I am device(light)!</Text>
    </View>
  )
}

export default App
