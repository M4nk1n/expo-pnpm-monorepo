module.exports = {
  presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@app': './src',
        },
      },
    ],
  ],
}
