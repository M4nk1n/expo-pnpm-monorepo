import { ColorValue } from '@types/react-native'

export type ThemeProps = {
  /**
   * 缩放
   */
  scale: number

  /**
   * Color - 各种颜色定义
   */
  Color: {
    /**
     * 主色调
     */
    LabelColor: ColorValue
    /**
     * 次主色调
     */
    SecondaryLabelColor: ColorValue
    /**
     * 次次主色调
     */
    TertiaryLabelColor: ColorValue
    /**
     * 次次次主色调
     */
    QuaternaryLabelColor: ColorValue

    /**
     * 主背景色
     */
    BackgroundColor: ColorValue
    /**
     * 次背景色
     */
    SecondaryBackgroundColor: ColorValue
    /**
     * 次次背景色
     */
    TertiaryBackgroundColor: ColorValue

    /**
     * 主分组背景色
     */
    GroupedBackgroundColor: ColorValue
    /**
     * 次分组背景色
     */
    SecondaryGroupedBackgroundColor: ColorValue
    /**
     * 次次分组背景色
     */
    TertiaryGroupedBackgroundColor: ColorValue

    /**
     * 出错用色
     */
    SystemErrorColor: ColorValue
    /**
     * 警告用色
     */
    SystemWarningColor: ColorValue
    /**
     * 成功用色
     */
    SystemSuccessColor: ColorValue
    /**
     * 完成用色
     */
    SystemCompleteColor: ColorValue

    SystemFillColor: ColorValue
    SecondarySystemFillColor: ColorValue
    TertiarySystemFillColor: ColorValue
    QuaternarySystemFillColor: ColorValue

    /**
     * 分割线颜色
     */
    SeparatorColor: ColorValue
    OpaqueSeparatorColor: ColorValue

    /**
     * 链接字体颜色
     */
    LinkColor: ColorValue

    /**
     * 主边框颜色
     */
    BorderColor: ColorValue
    /**
     * 次边框颜色
     */
    SecondaryBorderColor: ColorValue
    /**
     * 次次边框颜色
     */
    TertiaryBorderColor: ColorValue

    /**
     * Placeholder 字体颜色
     */
    PlaceholderTextColor: ColorValue

    /**
     * 主字体色
     */
    SystemTextColor: ColorValue
    /**
     * 次字体色
     */
    SecondaryTextColor: ColorValue
    /**
     * 次次字体色
     */
    TertiaryTextColor: ColorValue
    /**
     * 次次次字体色
     */
    QuaternaryTextColor: ColorValue

    /**
     * 其他颜色扩充定义
     */
    [key: string]: ColorValue
  }

  /**
   * Size - 各种大小定义：字体大小、行高、边框、圆角半径等
   */
  Size: {
    // 字体大小
    SuperSmallText: number
    VerySmallText: number
    SmallText: number
    NormalText: number
    BaseText: number
    LargeText: number
    HugeText: number
    VeryHugeText: number
    SuperHugeText: number

    // 行高
    SmallLineHeight: number
    BaseLineHeight: number
    LargeLineHeight: number
    HugeLineHeight: number

    // 边框、线宽
    SmallLineWidth: number
    BaseLineWidth: number
    LargeLineWidth: number

    /**
     * 其他大小扩充定义
     */
    [key: string]: number
  }

  /**
   * Space - 各种空间定义：外边距、内边距等
   */
  Space: {
    SmallSpace: number
    NormalSpace: number
    BaseSpace: number
    LargeSpace: number
    HugeSpace: number

    // 圆角
    SmallBorderRadius: number
    BaseBorderRadius: number
    LargeBorderRadius: number

    /**
     * 其他空间扩充定义
     */
    [key: string]: number
  }
}

/**
 * default - 使用系统 ColorScheme
 * light - 强制使用 light ColorScheme
 * dark - 强制使用 dark ColorScheme
 */
export type ColorScheme = 'default' | 'light' | 'dark'

export type Themes = {
  light: ThemeProps
  dark: ThemeProps
}
