import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StyleConstants} from '~utils/styles/constants';
import ThemeText from './widgets/ThemeText';
import {useTheme} from '~utils/styles/ThemeManager';

const Header = () => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.headerRootContainer,
        {
          padding: StyleConstants.Spacing.M,
          backgroundColor: colors.primary,
        },
      ]}>
      <ThemeText fontStyle={'L'} style={{color: '#fff'}}>
        Pet Sentry
      </ThemeText>
      <Text>Back</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default Header;
