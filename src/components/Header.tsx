import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';

const Header = () => {
  return (
    <View
      style={[
        styles.headerRootContainer,
        {
          padding: StyleConstants.Spacing.M,
        },
      ]}>
      <Text>Back</Text>
      <Text>Back</Text>
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
