import React, { PropsWithChildren } from 'react'

export const PureWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>
}
