import React from 'react'
import { ScrollView, Text } from 'react-native'

import { useStyles } from '@shared/theme'
import { VStack } from '@shared/components'

import { useLocalI18n } from '../locale'

const Agreement = () => {
  const { t } = useLocalI18n()

  const styles = useStyles(theme => ({
    page: {
      backgroundColor: theme.Color.BackgroundColor,
      padding: theme.Space.LargeSpace
    },
    container: {
      flex: 1
    },
    title: {
      color: theme.Color.SystemTextColor,
      fontSize: theme.Size.VeryHugeText,
      lineHeight: theme.Size.VeryHugeText * theme.Size.HugeLineHeight,
      textAlign: 'center'
    },
    date: {
      color: theme.Color.SystemTextColor,
      fontSize: theme.Size.SmallText,
      lineHeight: theme.Size.SmallText * theme.Size.LargeLineHeight,
      textAlign: 'center'
    },
    content: {
      color: theme.Color.SystemTextColor,
      fontSize: theme.Size.NormalText,
      lineHeight: theme.Size.NormalText * theme.Size.LargeLineHeight
    }
  }))

  return (
    <ScrollView style={styles.page}>
      <VStack style={styles.container}>
        <Text style={styles.title}>{t('ServicesAgreement')}</Text>
        <Text style={styles.date}>最近更新日期：2000年1月1日</Text>
        <Text>{'\n'}</Text>
        <Text style={styles.content}>{t('Content')}</Text>
        <Text>{'\n'}</Text>
      </VStack>
    </ScrollView>
  )
}

export default Agreement
