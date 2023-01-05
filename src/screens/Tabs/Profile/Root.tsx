import React from 'react';
import {Text, View} from 'react-native';
import ContainerLayout from '~components/ContainerLayout';
import PinMyPet from '~components/PinMyPet';
import Button from '~components/widgets/Button';
import ThemeText from '~components/widgets/ThemeText';
import { useAuthState } from '~utils/states/auth.state';
import {clearCredential} from '~utils/storage/keychain';

const Profile: React.FC = () => {
  const setCredential = useAuthState(state => state.setCredential);
  const onLogout = async () => {
    const status = await clearCredential();
    console.log('status', status);
    setCredential(null);
  };
  return (
    <ContainerLayout>
      <ThemeText>Profile Stack Screen</ThemeText>
      <PinMyPet />

      <Button title="Logout" onPress={onLogout} />
    </ContainerLayout>
  );
};

export default Profile;
