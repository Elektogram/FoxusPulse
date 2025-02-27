module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: [
      'node_modules/(?!react-native-reanimated|react-native-gesture-handler)',
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  };

  