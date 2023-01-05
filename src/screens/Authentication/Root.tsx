import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '~components/widgets/Button';
import {StyleConstants} from '~utils/styles/constants';
import {onFacebookAuthentication} from '~utils/queryHooks/auth';
import {useAuthState} from '~utils/states/auth.state';
import {storeCredential} from '~utils/storage/keychain';

const AuthenticationRoot = () => {
  const setCredential = useAuthState(state => state.setCredential);

  const onAuthentication = async () => {
    const token = await onFacebookAuthentication();

    if (token) {
      await storeCredential(token);
      setCredential(token);
    }
  };
  return (
    <View style={styles.rootContainer}>
      <Button
        title={'Login with Facebook'}
        onPress={() => onAuthentication()}
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
