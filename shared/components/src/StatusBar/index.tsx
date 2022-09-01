import React, { PropsWithChildren } from 'react'

import type { StatusBarProps } from 'expo-status-bar'
import { StatusBar } from 'expo-status-bar'

import { PureWrapper } from '../PureWrapper'

export const StatusBarProvider: React.FC<PropsWithChildren<StatusBarProps>> = ({ children, ...props }) => (
  <PureWrapper>
    <StatusBar style='auto' networkActivityIndicatorVisible {...props} />
    {children}
  </PureWrapper>
)
