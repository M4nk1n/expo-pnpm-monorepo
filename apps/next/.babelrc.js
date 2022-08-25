module.exports = {
  presets: ['@expo/next-adapter/babel'],
  plugins: [
    'react-native-web',
    // https://github.com/expo/expo/issues/14374
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@app': './node_modules/@packages/app/src',
        },
      },
    ],
    // Note: If you load other babel plugins, the Reanimated plugin has to be listed last in the plugins array.
    'react-native-reanimated/plugin',
  ],
}
