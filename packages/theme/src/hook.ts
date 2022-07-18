import { useContext } from 'react'
import { useColorScheme } from 'react-native'
import { ColorScheme, Themes } from './@types'
import { ThemeContext } from './context'

export const useTheme = () => {
  const { themes, setThemes, colorScheme, setColorScheme } = useContext(ThemeContext)
  const RNColorScheme = useColorScheme()

  const realColorScheme = colorScheme === 'default' ? RNColorScheme || 'light' : colorScheme

  const theme = themes[realColorScheme]

  /**
   * 初始化主题
   *
   * Themes: {
   *   light: {@link ThemeProps}
   *   dark: {@link ThemeProps}
   * }
   *
   * @param themes {@link Themes}
   */
  const initThemes = (themes: Themes) => {
    setThemes(themes)
  }

  const changeColorScheme = (colorScheme: ColorScheme) => {
    setColorScheme(colorScheme)
  }

  return {
    initThemes,

    /**
     * 主题变量（颜色、空间、大小定义等）
     */
    theme,

    /**
     * 当前使用中的 ColorScheme 主题
     * ```
     * "light" -> 强制使用 light 模式
     * "dark" -> 强制使用 dark 模式
     * ```
     * @return "light" | "dark"
     */
    currentColorScheme: realColorScheme,

    /**
     * 当前使用的 ColorScheme 设置，由 changeColorScheme 设置
     * ```
     * "default" -> 使用系统定义的 ColorScheme
     * "light" -> 强制使用 light 模式
     * "dark" -> 强制使用 dark 模式
     * ```
     * @return "default" | "light" | "dark"
     */
    colorScheme,

    /**
     * 修改当前 ColorScheme  主题
     * ```
     * "default" -> 使用系统定义的 ColorScheme
     * "light" -> 强制使用 light 模式
     * "dark" -> 强制使用 dark 模式
     * ```
     * @param colorScheme "default" | "light" | "dark"
     */
    changeColorScheme,
  }
}
