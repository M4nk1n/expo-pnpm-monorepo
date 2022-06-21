import React, { useEffect } from 'react'

import { PureWrapper } from '@packages/components'

const AppProvider: React.FC = props => {
  useEffect(() => {
    // Some init code here.
    // SDK, Push Services, etc.
  }, [])

  return <PureWrapper {...props} />
}

export default AppProvider
