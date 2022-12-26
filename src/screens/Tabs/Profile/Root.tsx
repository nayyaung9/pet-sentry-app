import React from 'react';
import { Text, View } from 'react-native';
import ContainerLayout from '~components/ContainerLayout';
import PinMyPet from '~components/PinMyPet';
import ThemeText from '~components/widgets/ThemeText';

const Profile: React.FC = () => {
  return (
    <ContainerLayout>
      <ThemeText>Profile Stack Screen</ThemeText>
      <PinMyPet />
    </ContainerLayout>
  )
}

export default Profile;