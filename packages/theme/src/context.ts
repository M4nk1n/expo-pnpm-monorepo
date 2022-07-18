import { createContext } from 'react'
import { ColorScheme, Themes } from './@types'

export interface ThemeContextProps {
  themes: Themes
  setThemes: React.Dispatch<React.SetStateAction<Themes>>
  colorScheme: ColorScheme
  setColorScheme: React.Dispatch<React.SetStateAction<ColorScheme>>
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps)
