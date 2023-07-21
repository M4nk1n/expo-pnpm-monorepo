// const withPlugins = require('next-compose-plugins')
// const withFonts = require('next-fonts')
// const withImages = require('next-images')
const { withExpo } = require('@expo/next-adapter')

/** @type {import('next').NextConfig} */
const nextConfig = withExpo({
  // images: { disableStaticImages: true }, // This feature conflicts with next-images
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    'react-native',
    // 'react-native-web',
    // 'expo',
    // Add more React Native / Expo packages here...
    '@react-navigation/native',
    '@react-navigation/stack',
    '@react-navigation/drawer',
    '@react-navigation/elements',
    'react-native-safe-area-context',
    'react-native-reanimated',
    'expo-modules-core',
    'expo-splash-screen',
    'expo-status-bar',
    'expo-secure-store',
    'i18n-js'
  ],
  experimental: {
    forceSwcTransforms: true,
    externalDir: true // Allows us to access other directories in the monorepo
  }
})

// module.exports = withPlugins(
//   [
//     [withFonts, defaultPluginsConfig],
//     [withImages, defaultPluginsConfig],
//     [withExpo, nextConfig], // See: https://docs.expo.dev/guides/using-nextjs/#config
//   ],
//   defaultPluginsConfig
// )

module.exports = nextConfig
