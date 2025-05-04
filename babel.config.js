module.exports = {
  presets: ['module:@react-native/babel-preset'],
  overrides: [
    // this plugins crashes react native maps markers
    {
      test: fileName => !fileName.includes('node_modules/react-native-maps'),
      plugins: [
        [require('@babel/plugin-transform-private-methods'), {loose: true}],
      ],
    },
  ],

  plugins: ['react-native-reanimated/plugin'],
};
