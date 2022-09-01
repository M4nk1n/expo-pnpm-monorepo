import { useContext } from 'react'
import type { DateTime, Dict, StrftimeOptions, TranslateOptions } from 'i18n-js/typings/typing'

import { I18nContext } from './context'

export type ScopeOptions = { scope: string }

/**
 * See: {@link: https://www.npmjs.com/package/i18n-js/v/next}
 * GitHub: {@link: https://github.com/fnando/i18n}
 */
export const useI18n = () => {
  const { i18n } = useContext(I18nContext)

  /**
   * `en` is both the current and default locale.
   * To override either values, you have to use `I18n#defaultLocale` and `I18n#locale`.
   *
   * Example:
   *
   * ```
   * const { setDefaultLocale } = useI18n()
   * setDefaultLocale("zh-Hant")
   * ```
   */
  const setDefaultLocale = (locale: string) => {
    i18n.current.defaultLocale = locale
  }

  /**
   * `en` is both the current and default locale.
   * To override either values, you have to use `I18n#defaultLocale` and `I18n#locale`.
   *
   * Example:
   *
   * ```
   * const { setLocale } = useI18n()
   * setLocale("zh-Hant")
   * ```
   */
  const setLocale = (locale: string) => {
    i18n.current.locale = locale
  }

  /**
   * Updating translation store.
   * Using a separate file for each language, like this:
   *
   * ```
   * import en from "translations/en.json"
   *
   * const { store } = useI18n()
   * // no scope
   * store(en, "en")
   * // use scope
   * store(en, "en", { scope: "main" })
   * ```
   *
   * @param translations 翻译文件
   * @param locale 语言区域
   * @param options 域
   */
  const store = (translations: Dict, locale: string, options?: ScopeOptions) => {
    i18n.current.store(!!options ? { [locale]: { [options.scope]: translations } } : { [locale]: translations })
  }

  /**
   * Check translation store if exist.
   * like this:
   *
   * ```
   * const { checkStore } = useI18n()
   * try {
   *   checkStore({ scope: "main" })
   *   console.log("i18n store here.")
   * } catch {
   *   console.log("i18n store missing.")
   * }
   * ```
   *
   * @param scope store 域
   * @param options TranslateOptions(Do not override `missingBehavior`)
   */
  const checkStore = (scope: ScopeOptions, options?: TranslateOptions) => {
    i18n.current.t(scope.scope, { missingBehavior: 'error', ...options })
  }

  /**
   * To translate messages, you have to use the `I18n#translate`, or its `I18n#t` alias.
   *
   * Also see: {@link i18n.current.translate}
   *
   * Example:
   *
   * ```
   * const { t } = useI18n()
   * // only string
   * t("hello")   // => Hi!
   * // only string with (dynamic values)
   * t("hello", { name: "John" })   // { hello: "Hi, %{name}!" } in store => Hi, John!
   * // use scope
   * t("main.hello")  // => HiMain!
   * t("hello", { scope: "main" })  // => HiMain!
   * t("hello", { scope: "main", name: "John" })   // { hello: "Hi, %{name}!" } in store => Hi, John!
   * ```
   *
   * @param tag
   * @param options store 域 / TranslateOptions
   * @returns
   */
  const t = (tag: string, options?: ScopeOptions | TranslateOptions) => {
    return i18n.current.t(tag, options)
  }

  const l = (type: string, value: string | number | Date | null | undefined, options?: Dict) =>
    i18n.current.l(type, value, options)

  const toTime = (type: string, input: DateTime) => i18n.current.toTime(type, input)

  const strftime = (date: Date, format: string, options?: Partial<StrftimeOptions>) =>
    i18n.current.strftime(date, format, options)

  return { i18n: i18n.current, setDefaultLocale, setLocale, store, checkStore, t, l, toTime, strftime }
}
