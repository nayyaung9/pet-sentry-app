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
    ["module:react-native-dotenv", {
      "envName": "PET_SENTRY_ENV",
      "moduleName": "@env",
      "path": ".env",
      "blocklist": null,
      "allowlist": null,
      "safe": false,
      "allowUndefined": false,
      "verbose": false
    }]
  ]
};
