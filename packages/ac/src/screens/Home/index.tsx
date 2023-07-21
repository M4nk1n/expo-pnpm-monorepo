import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@shared/navigation'

import type { NavigationProps } from '../../navigation/types'
import { ScreenList } from '../../constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Home = (): JSX.Element => {
  const navigation = useNavigation<NavigationProps<ScreenList.Home>>()

  useEffect(() => {
    console.log('device/ac init.')
  }, [])

  const goAbout = () => {
    navigation.navigate(ScreenList.About)
  }

  return (
    <View style={styles.container}>
      <Text>I am device(ac)!</Text>
      <Button onPress={goAbout} title='Click to About' />
    </View>
  )
}

export default Home
