import React, { useMemo } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'

import iconNormal from './assets/opt_nor.png'
import iconChecked from './assets/opt_sel.png'

type CheckBoxProps = {
  size: number
  checked: boolean
  onPress?: () => void
  disabled?: boolean
}

const CheckBox: React.FC<CheckBoxProps> = ({ size, checked, onPress, disabled = false }) => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {
        width: size,
        height: size,
        resizeMode: 'contain',
      },
    })
  }, [size])

  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <View style={styles.view}>
        <Image source={checked ? iconChecked : iconNormal} style={styles.icon} />
      </View>
    </Pressable>
  )
}

export { CheckBox }
