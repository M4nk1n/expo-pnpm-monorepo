import type { ThemeProps } from '../types'

export const DefaultTheme: ThemeProps = {
  scale: 1,
  Color: {
    LabelColor: '#F74550',
    SecondaryLabelColor: '#F74550',
    TertiaryLabelColor: '#F74550',
    QuaternaryLabelColor: '#F74550',

    BackgroundColor: '#FFF',
    SecondaryBackgroundColor: '#FBFCFF',
    TertiaryBackgroundColor: '#FBFCFF',

    GroupedBackgroundColor: '#FBFCFF',
    SecondaryGroupedBackgroundColor: '#FBFCFF',
    TertiaryGroupedBackgroundColor: '#FBFCFF',

    SystemErrorColor: '#D00',
    SystemWarningColor: '#D00',
    SystemSuccessColor: '#090',
    SystemCompleteColor: '#090',

    SystemFillColor: '#F74550',
    SecondarySystemFillColor: '#F74550',
    TertiarySystemFillColor: '#F74550',
    QuaternarySystemFillColor: '#F74550',

    SeparatorColor: '#666',
    OpaqueSeparatorColor: '#666',

    LinkColor: '#07F',

    BorderColor: '#EEE',
    SecondaryBorderColor: '#EEE',
    TertiaryBorderColor: '#EEE',

    PlaceholderTextColor: '#999',

    SystemTextColor: '#000',
    SecondaryTextColor: '#111',
    TertiaryTextColor: '#222',
    QuaternaryTextColor: '#333',
  },
  Size: {
    SuperSmallText: 12,
    VerySmallText: 15,
    SmallText: 18,
    NormalText: 24,
    BaseText: 30,
    LargeText: 40,
    HugeText: 60,
    VeryHugeText: 100,
    SuperHugeText: 200,

    SmallLineHeight: 1,
    BaseLineHeight: 1.2,
    LargeLineHeight: 1.5,
    HugeLineHeight: 2,

    SmallLineWidth: 0.5,
    BaseLineWidth: 1,
    LargeLineWidth: 2,
  },
  Space: {
    SmallSpace: 2.5,
    NormalSpace: 5,
    BaseSpace: 10,
    LargeSpace: 15,
    HugeSpace: 20,

    SmallBorderRadius: 5,
    BaseBorderRadius: 10,
    LargeBorderRadius: 20,
  },
}
