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
    inlineRequires: true,
  },
})

module.exports = config
