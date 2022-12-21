import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';
import ThemeText from './widgets/ThemeText';

const Header = () => {
  return (
    <View
      style={[
        styles.headerRootContainer,
        {
          padding: StyleConstants.Spacing.M,
        },
      ]}>
      <ThemeText fontStyle={'L'} style={{ color: '#fff' }}>Pet Sentry</ThemeText>
      <Text>Back</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#faa7ca',
  },
});
export default Header;
