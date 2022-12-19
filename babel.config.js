module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './assets',
          '@root': './src',
          '@api': './src/api',
          '@helpers': './src/helpers',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils'
        }
      }
    ],
  ]
};
