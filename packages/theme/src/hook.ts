import { DependencyList, useContext, useMemo } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import type { ColorScheme, ThemeProps, Themes } from './@types'
import { ThemeContext } from './context'

export const useTheme = () => {
  const { themes, setThemes, colorScheme, setColorScheme } = useContext(ThemeContext)
  const RNColorScheme = useColorScheme()

  const realColorScheme = colorScheme === 'default' ? RNColorScheme || 'light' : colorScheme

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

  /**
   * 修改当前 ColorScheme  主题
   * ```
   * "default" -> 使用系统定义的 ColorScheme
   * "light" -> 强制使用 light 模式
   * "dark" -> 强制使用 dark 模式
   * ```
   * @param colorScheme "default" | "light" | "dark"
   */
  const changeColorScheme = (colorScheme: ColorScheme) => {
    setColorScheme(colorScheme)
  }

  return {
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
     * 当前使用中的 ColorScheme 主题
     * ```
     * "light" -> 强制使用 light 模式
     * "dark" -> 强制使用 dark 模式
     * ```
     * @return "light" | "dark"
     */
    currentColorScheme: realColorScheme,

    /**
     * 主题变量（颜色、空间、大小定义等）
     */
    theme: themes[realColorScheme],

    initThemes,
    changeColorScheme,
  }
}

export const useStyles = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  create: (theme: ThemeProps) => T | StyleSheet.NamedStyles<T>,
  deps: DependencyList = []
): T => {
  const { theme } = useTheme()
  return useMemo(
    () => StyleSheet.create(create(theme)),
    // I wish exhaustive-deps could check also custom hooks somehow.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, ...deps]
  )
}
