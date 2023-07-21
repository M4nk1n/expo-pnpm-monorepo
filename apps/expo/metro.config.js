// Learn more https://docs.expo.io/guides/customizing-metro

const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot]

// 2. Let Metro know where to resolve packages, and in what order
// config.resolver.nodeModulesPaths = [
//   path.resolve(projectRoot, 'node_modules'),
//   path.resolve(workspaceRoot, 'node_modules'),   // needed for npm workspaces
// ]
config.resolver.resolveRequest = (context, moduleName, platform) => {
  let newModuleName = moduleName
  /**
   * 各 packages 的 paths alias 都需要在这里做相应的 replace
   * See: https://github.com/facebook/metro/issues/542#issuecomment-1059821963
   */
  if (!!moduleName && moduleName.startsWith('@app')) {
    // For Metro >=0.68
    newModuleName = newModuleName.replace('@app/', '@packages/app/src/')
    // console.log("resolveRequest -> replace: ", moduleName, newModuleName)
  }
  return require('metro-resolver').resolve(context, newModuleName, platform)
}

// 3. getTransformOptions
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true, // this is so `import React from "react"` is not needed.
    inlineRequires: true
  }
})

// Enable experimental symlink support for pnpm
config.resolver.unstable_enableSymlinks = true

/** Resolve modules in a chain, using the location of the previous module for the next resolve step */
function resolveInOrder(...moduleNames) {
  return moduleNames.reduce((cwd, moduleName) => {
    return !cwd ? require.resolve(moduleName) : require.resolve(moduleName, { paths: [cwd] })
  })
}

// These can't be found from the project root, it has to be resolved from `react-native` or `metro-config`
config.transformer.asyncRequireModulePath = resolveInOrder('react-native', 'metro-runtime/src/modules/asyncRequire')
// These can't be found either, but do not cause a crash immediately (probably because they are used later)
// config.transformerPath = resolveInOrder('react-native', 'metro-transform-worker');
// config.transformer.minifierPath = resolveInOrder('react-native', 'metro-minify-terser');
// config.transformer.workerPath = resolveInOrder('react-native', 'metro/src/DeltaBundler/Worker');

// An error like `Unable to resolve "make-plural" from "node modules/i18n-js/dist/import/Pluralization.js"`
// https://github.com/fnando/i18n#im-getting-an-error-like-unable-to-resolve-make-plural-from-node-modulesi18n-jsdistimportpluralizationjs
if (!config.resolver.sourceExts) {
  config.resolver.sourceExts = ['mjs']
} else {
  config.resolver.sourceExts.push('mjs')
}

module.exports = config
