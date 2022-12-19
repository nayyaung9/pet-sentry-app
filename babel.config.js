module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '~assets': './assets',
          '~root': './src',
          '~startup': './src/startup',
          '~navigation': './src/navigation',
          '~components': './src/components',
          '~screens': './src/screens',
          '~utils': './src/utils'
        }
      }
    ],
  ]
};
