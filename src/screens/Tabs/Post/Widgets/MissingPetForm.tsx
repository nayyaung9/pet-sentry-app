import React from 'react';
import {View} from 'react-native';
import Gender from '~components/widgets/Gender';
import Input from '~components/widgets/Input';
import ThemeText from '~components/widgets/ThemeText';

const MissingPetForm = () => {
  return (
    <View>
      <ThemeText>Missing</ThemeText>
      <Gender />
      <Input label="Pet name" />
      <Input
        label="Special traits"
        maxLength={60}
        multiline
        helperText="Unusual color, behavior, etc"
      />
    </View>
  );
};

export default MissingPetForm;
