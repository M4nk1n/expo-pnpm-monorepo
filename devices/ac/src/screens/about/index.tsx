import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const About = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>I am device(ac) - about!</Text>
    </View>
  )
}

export default About
