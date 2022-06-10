const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const { withExpo } = require('@expo/next-adapter');

const { dependencies } = require('./package.json');
const dependenciesToTranspile = Object.keys(dependencies || [])
  .filter(dependency => dependency.startsWith('@packages/') || dependency.startsWith('@devices/'));

const withTM = require('next-transpile-modules')([
  'react-native-web',
  ...dependenciesToTranspile
]);

const defaultPluginsConfig = {
  projectRoot: __dirname
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...defaultPluginsConfig,
  reactStrictMode: true,
  images: {
    disableStaticImages: true
  }
};

module.exports = withPlugins(
  [
    [withTM, { resolveSymlinks: true }],
    [withFonts, defaultPluginsConfig],
    [withImages, defaultPluginsConfig],
    [withExpo, defaultPluginsConfig]
  ],
  nextConfig
);
