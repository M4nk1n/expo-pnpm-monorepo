import React from 'react'
import { ScrollView, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { useStyles, useTheme } from '@shared/theme'
import { useI18n } from '@shared/i18n'
import { VStack } from '@shared/components'

import { LanguageScope } from '../locale'

const Agreement = () => {
  const { t } = useI18n()

  const styles = useStyles(theme => ({
    page: {
      backgroundColor: theme.Color.BackgroundColor,
      padding: theme.Space.LargeSpace,
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
        <Text style={styles.title}>{t('ServicesAgreement', LanguageScope)}</Text>
        <Text style={styles.date}>最近更新日期：2000年1月1日</Text>
        <Text>{'\n'}</Text>
        <Text style={styles.content}>{t('Content', LanguageScope)}</Text>
        <Text>{'\n'}</Text>
      </VStack>
    </ScrollView>
  )
}

export default Agreement
