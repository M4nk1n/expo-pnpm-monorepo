import React, { Suspense } from 'react'
import { View } from 'react-native'

export interface SuspenseProviderProps {
  fallback?: React.ReactNode
}

export const SuspenseProvider: React.FC<SuspenseProviderProps> = ({ fallback, ...props }) => (
  <Suspense fallback={fallback ?? <View />} {...props} />
)
