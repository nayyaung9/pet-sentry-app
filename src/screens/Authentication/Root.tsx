import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '~components/widgets/Button';
import ThemeText from '~components/widgets/ThemeText';
import {StyleConstants} from '~utils/styles/constants';
import apiInstance from '~utils/api/instance';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const AuthenticationRoot = () => {
  const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    console.log('data', data);
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    const firebaseUserCredential = await auth().signInWithCredential(facebookCredential);
    console.warn(JSON.stringify(firebaseUserCredential));
    return firebaseUserCredential;
  };
  return (
    <View style={styles.rootContainer}>
      <ThemeText>Authentication Root</ThemeText>
      <Button title={'Login with Facebook'} onPress={onFacebookButtonPress} />
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
