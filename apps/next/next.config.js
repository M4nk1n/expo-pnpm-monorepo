const withPlugins = require('next-compose-plugins')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const { withExpo } = require('@expo/next-adapter')
// const path = require('path')

// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
// const workspaceRoot = path.resolve(__dirname, '../..')
const projectRoot = __dirname

// const { dependencies } = require('./package.json')
// const dependenciesToTranspile = Object.keys(dependencies || [])
//   .filter(dependency => dependency.startsWith('@packages/') || dependency.startsWith('@devices/'))

const withTM = require('next-transpile-modules')([
  'react-native-web',
  'i18n-js',
  // ...dependenciesToTranspile
])

const defaultPluginsConfig = { projectRoot }

const aliases = {
  // Transform all direct `react-native` imports to `react-native-web`
  'react-native': 'react-native-web',
  'react-native-maps': 'react-native-web-maps',
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...defaultPluginsConfig,
  experimental: { externalDir: true }, // Allows us to access other directories in the monorepo
  images: { disableStaticImages: true }, // This feature conflicts with next-images
  reactStrictMode: true,
  webpack: (config, { isServer, defaultLoaders }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ...aliases,
    }
    config.resolve.extensions = ['.web.js', '.web.ts', '.web.tsx', ...config.resolve.extensions]

    if (isServer) {
      config.externals = ['react', 'react-native-web', ...config.externals]
    }
    // config.resolve.alias['react'] = path.resolve(workspaceRoot, '.', 'node_modules', 'react')
    // config.resolve.alias['react-native-web'] = path.resolve(workspaceRoot, '.', 'node_modules', 'react-native-web')

    defaultLoaders.babel.options.babelrc = true
    defaultLoaders.babel.options.rootMode = 'upward'

    return config
  },
}

module.exports = withPlugins(
  [
    [withTM, { resolveSymlinks: true }],
    [withFonts, defaultPluginsConfig],
    [withImages, defaultPluginsConfig],
    [withExpo, defaultPluginsConfig],
  ],
  nextConfig
)
