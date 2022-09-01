import React, { PropsWithChildren, Suspense } from 'react'
import { ActivityIndicator } from 'react-native'

export interface SuspenseProviderProps {
  fallback?: React.ReactNode
}

export const SuspenseProvider: React.FC<PropsWithChildren<SuspenseProviderProps>> = ({ fallback, ...props }) => (
  <Suspense fallback={fallback ?? <ActivityIndicator size='large' />} {...props} />
)
