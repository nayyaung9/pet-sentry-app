import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import apiInstance from '~utils/api/instance';

type FirebaseProfileCredentialType = {
  email: string;
  name: string;
  picture: any;
};
export const onFacebookAuthentication = async () => {
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  const firebaseUserCredential = await auth().signInWithCredential(
    facebookCredential,
  );

  const {additionalUserInfo} = firebaseUserCredential;

  if (additionalUserInfo?.isNewUser) {
    const {
      email,
      name,
      picture: {
        data: {url},
      },
    } = additionalUserInfo?.profile as FirebaseProfileCredentialType;

    const authenticateBodyRequest = {name, email, profileUrl: url};

    try {
      await apiInstance.post('users/authenticate', {
        ...authenticateBodyRequest,
      });
    } catch (err) {}
  } else {

  }

  return firebaseUserCredential;
};
