import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '~components/widgets/Button';
import ThemeText from '~components/widgets/ThemeText';
import {StyleConstants} from '~utils/styles/constants';
import apiInstance from '~utils/api/instance';

const AuthenticationRoot = () => {
  const testApi = async () => {
    try {
      const status = await apiInstance.post('/users/authenticate');
      console.log('Status ===>', status);
    } catch (err) {
      console.log('login Error ===>', err?.message, err?.response?.data);
    }
  };
  return (
    <View style={styles.rootContainer}>
      <ThemeText>Authentication Root</ThemeText>
      <Button title={'Login with Facebook'} onPress={testApi} />
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
