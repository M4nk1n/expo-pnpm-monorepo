import React, { useState } from 'react'

import type { ColorScheme, Themes } from './@types'
import { ThemeContext } from './context'
import { DefaultTheme } from './themes'

export const ThemeProvider: React.FC = ({ children }) => {
  const [themes, setThemes] = useState<Themes>({ light: DefaultTheme, dark: DefaultTheme })
  const [colorScheme, setColorScheme] = useState<ColorScheme>('default')

  return (
    <ThemeContext.Provider value={{ themes, setThemes, colorScheme, setColorScheme }}>{children}</ThemeContext.Provider>
  )
}
