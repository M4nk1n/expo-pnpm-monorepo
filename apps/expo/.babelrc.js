module.exports = function (api) {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      // Note: If you load other babel plugins, the Reanimated plugin has to be listed last in the plugins array.
      'react-native-reanimated/plugin',
    ],
  }
}
