# 导航组件

> 如需使用原生 Stack (@react-navigation/native-stack)：
>
> 1. 本组件项目下添加 peerDependencies 依赖：`"@react-navigation/native-stack": "^6"`
> 2. expo 项目下添加 dependencies 依赖：`"@react-navigation/native-stack": "^6.7.0"`
> 3. 重命名 src 下的 `index.native.ts.disable` 为 `index.native.ts`
> 4. 重新运行安装依赖及编译脚本

## Type checking with TypeScript

[Type checking with TypeScript | React Navigation](https://reactnavigation.org/docs/typescript/#nesting-navigators)

### Type checking the navigator

```typescript
export type TermsStackParamList = {
  TermsOne: undefined
  TermsTwo: { version: number }
}

export type StackProps<T extends keyof TermsStackParamList> = StackScreenProps<TermsStackParamList, T>
export type NavigationProps<T extends keyof TermsStackParamList> = NavigationProp<TermsStackParamList, T>
export type ScreenProps<T extends keyof TermsStackParamList> = RouteProp<TermsStackParamList, T>
```

### Type checking with nesting navigators

You can _[navigate to a screen in a nested navigator][navigate-in-nested-navigator]_
by passing screen and params properties for the nested screen:

[navigate-in-nested-navigator]: https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator

```typescript
navigation.navigate('Terms', {
  screen: 'TermsTwo',
  params: { version: 1 },
})
```

To be able to type check this, we need to extract the params from
the screen containing the nested navigator. This can be done using
the `NavigatorScreenParams` utility:

```typescript
export type StackParamList = {
  Home: undefined
  Profile: undefined
  Terms: NavigatorScreenParams<TermsStackParamList>
}

export type StackProps<T extends keyof StackParamList> = StackScreenProps<StackParamList, T>
export type NavigationProps<T extends keyof StackParamList> = NavigationProp<StackParamList, T>
export type ScreenProps<T extends keyof StackParamList> = RouteProp<StackParamList, T>
```

### Annotating useNavigation

To annotate the `navigation` prop that we get from `useNavigation`,
we can use a type parameter:

```typescript
const navigation = useNavigation<NavigationProps>()

// or
const navigation = useNavigation<StackProps['navigation']>()
```

### Annotating useRoute

To annotate the `route` prop that we get from `useRoute`,
we can use a type parameter:

```typescript
const route = useRoute<ScreenProps>()

// or
const route = useRoute<StackProps['route']>()
```
