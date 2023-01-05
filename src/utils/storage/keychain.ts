import * as Keychain from 'react-native-keychain';

export const storeCredential = async (token: string) => {
  return await Keychain.setGenericPassword('credential', token);
};

export const getCredential = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials?.password : undefined;
  } catch (error) {
    return undefined;
  }
};

export const clearCredential = async () =>
  await Keychain.resetGenericPassword();
