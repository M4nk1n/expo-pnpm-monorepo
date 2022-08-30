import React, { useCallback, useState } from 'react'
import { Image, ImageSourcePropType, LayoutChangeEvent, Pressable, StyleSheet } from 'react-native'

type LayoutType = (event: LayoutChangeEvent) => void

interface NavigationBarButtonProps {
  source: ImageSourcePropType
  onPress?: () => void
  disabled?: boolean
}

const IconScale = 0.4

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
})

const NavigationBarButton: React.FC<NavigationBarButtonProps> = ({ source, onPress, disabled = false }) => {
  const [height, setHeight] = useState(0)
  const onLayout = useCallback<LayoutType>(e => setHeight(e.nativeEvent.layout.height * IconScale), [])

  return (
    <Pressable onPress={onPress} disabled={disabled} onLayout={onLayout} style={styles.view}>
      <Image source={source} style={{ width: height, height, resizeMode: 'contain' }} />
    </Pressable>
  )
}

export { NavigationBarButton }
