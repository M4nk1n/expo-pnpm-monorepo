import React, { Suspense } from 'react'
import { View } from 'react-native'

export interface SuspenseProviderProps {
  fallback?: React.ReactNode
  children?: React.ReactNode
  [key: string]: any
}

export const SuspenseProvider: React.FC = ({ fallback, ...props }: SuspenseProviderProps) => (
  <Suspense fallback={fallback ?? <View />} {...props} />
)
