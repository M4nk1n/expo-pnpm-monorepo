import React from 'react'
import { ScrollView, Text } from 'react-native'

import { useDimensions, useEffectOnce } from '@shared/hooks'
import { useNavigation } from '@shared/navigation'
import { useStyles, useTheme } from '@shared/theme'
import { useI18n } from '@shared/i18n'
import { VStack } from '@shared/components'

import { LanguageScope } from '../locale'
import { StatusBar } from 'expo-status-bar'

const Privacy = () => {
  const navigation = useNavigation()
  const { t } = useI18n()

  useEffectOnce(() => {
    navigation.setOptions({
      title: t('PrivacyStatement', LanguageScope),
    })
  })

  const { safeAreaInsets } = useDimensions()
  const styles = useStyles(theme => ({
    page: {
      backgroundColor: theme.Color.BackgroundColor,
      padding: theme.Space.LargeSpace,
      marginTop: safeAreaInsets.top,
    },
    container: {
      flex: 1,
    },
    title: {
      color: theme.Color.SystemTextColor,
      fontSize: theme.Size.VeryHugeText,
      lineHeight: theme.Size.VeryHugeText * theme.Size.HugeLineHeight,
      textAlign: 'center',
    },
    date: {
      color: theme.Color.SystemTextColor,
      fontSize: theme.Size.SmallText,
      lineHeight: theme.Size.SmallText * theme.Size.LargeLineHeight,
      textAlign: 'center',
    },
    subTitle: {
      color: theme.Color.SystemTextColor,
      fontSize: theme.Size.LargeText,
      lineHeight: theme.Size.LargeText * theme.Size.HugeLineHeight,
    },
    content: {
      color: theme.Color.SystemTextColor,
      fontSize: theme.Size.NormalText,
      lineHeight: theme.Size.NormalText * theme.Size.LargeLineHeight,
    },
  }))

  const { currentColorScheme } = useTheme()

  return (
    <ScrollView style={styles.page}>
      <StatusBar style={currentColorScheme} />

      <VStack style={styles.container}>
        <Text style={styles.title}>{t('PrivacyStatement', LanguageScope)}</Text>
        <Text style={styles.date}>更新日期：2000年1月1日</Text>
        <Text>{'\n'}</Text>

        <Text style={styles.subTitle}>{t('SubTitle', LanguageScope)}</Text>
        <Text style={styles.content}>{t('Content', LanguageScope)}</Text>
        <Text>{'\n'}</Text>
      </VStack>
    </ScrollView>
  )
}

export default Privacy
