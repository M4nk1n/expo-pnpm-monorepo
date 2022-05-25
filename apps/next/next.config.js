const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withFonts = require('next-fonts');
const { withExpo } = require('@expo/next-adapter');

const withTM = require('next-transpile-modules')([
  'react-native-web',
  '@packages/app'
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true
};

module.exports = withPlugins(
  [
    withTM,
    [withImages, { projectRoot: __dirname }],
    [withFonts, { projectRoot: __dirname }],
    [withExpo, { projectRoot: __dirname }],
  ],
  nextConfig
);
