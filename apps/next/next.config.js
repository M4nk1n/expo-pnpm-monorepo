const withPlugins = require('next-compose-plugins')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const { withExpo } = require('@expo/next-adapter')
// const path = require('path')

// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
const projectRoot = __dirname
// const workspaceRoot = path.resolve(projectRoot, '../..')

const withTM = require('next-transpile-modules')(['react-native-web', 'i18n-js'])

const defaultPluginsConfig = { projectRoot }

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...defaultPluginsConfig,
  experimental: { externalDir: true }, // Allows us to access other directories in the monorepo
  images: { disableStaticImages: true }, // This feature conflicts with next-images
  reactStrictMode: true,
}

module.exports = withPlugins(
  [
    [withTM, { resolveSymlinks: true }],
    [withFonts, defaultPluginsConfig],
    [withImages, defaultPluginsConfig],
    [withExpo, defaultPluginsConfig], // See: https://docs.expo.dev/guides/using-nextjs/#config
  ],
  nextConfig
)
