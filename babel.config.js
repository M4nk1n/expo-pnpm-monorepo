module.exports = {
  // presets: [
  //   ["babel-preset-expo", { jsxRuntime: "automatic" }],
  //   ["@babel/preset-typescript", { isTSX: true, allExtensions: true }]
  // ],

  // plugins: [
  //   "@babel/plugin-transform-modules-commonjs",
  //   "@babel/plugin-proposal-object-rest-spread",
  //   "@babel/plugin-transform-regenerator",
  //   "@babel/plugin-transform-runtime",
  //   // insert before @babel/plugin-proposal-class-properties
  //   "@babel/plugin-transform-flow-strip-types",
  //   ["@babel/plugin-proposal-class-properties", { loose: true }]
  // ],

  // env: {
  //   development: {
  //     plugins: ["react-hot-loader/babel"]
  //   },
  //   production: {
  //     plugins: [
  //       "@babel/plugin-transform-react-constant-elements",
  //       "@babel/plugin-transform-react-inline-elements"
  //     ]
  //   }
  // },

  babelrcRoots: [
    // Keep the root as a root
    '.',
    // Also consider monorepo packages "root" and load their .babelrc.json.
    './apps/*',
    './shared/*',
    './packages/*',
  ],
}
