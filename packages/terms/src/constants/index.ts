const Constants = {}

export default Constants

export const TermsType = ['Agreement', 'Privacy'] as const

export type TermsTypeStatic = typeof TermsType[number]
