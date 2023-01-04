import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '~components/widgets/Button';
import ThemeText from '~components/widgets/ThemeText';
import {StyleConstants} from '~utils/styles/constants';
import {onFacebookAuthentication} from '~utils/queryHooks/auth';

const AuthenticationRoot = () => {
  return (
    <View style={styles.rootContainer}>
      <ThemeText>Authentication Root</ThemeText>
      <Button
        title={'Login with Facebook'}
        onPress={onFacebookAuthentication}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: StyleConstants.Spacing.Global.PagePadding,
  },
});
export default AuthenticationRoot;
