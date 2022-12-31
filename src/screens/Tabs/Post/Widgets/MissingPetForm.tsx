import React, {useRef} from 'react';
import {View} from 'react-native';
import Button from '~components/widgets/Button';
import Gender from '~components/widgets/Gender';
import Input from '~components/widgets/Input';
import ActionSheet from '~components/widgets/ActionSheet';
import ThemeText from '~components/widgets/ThemeText';
import Select from '~components/widgets/Select';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MissingPetForm = () => {
  const actionSheetRef = useRef<any>(null);

  return (
    <View>
      <Gender />
      <Input label="Pet name" />
      <Input label="Missing here" />

      <Select
        label="Collar Color"
        onPress={() => actionSheetRef.current?.open()}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <ThemeText>Select Collar Color...</ThemeText>
          <Ionicons name="md-chevron-forward-outline" />
        </View>
      </Select>

      <Input
        label="Special traits"
        maxLength={60}
        multiline
        helperText="Unusual color, behavior, etc"
      />
      <Input label="Comment" maxLength={120} multiline />
      <Button title="Post" onPress={() => console.log('Post')} />

      <ActionSheet ref={actionSheetRef}>
        <Input
          label="Search..."
          maxLength={60}
          multiline
          helperText="Unusual color, behavior, etc"
        />
        <ThemeText>Action Sheet</ThemeText>
      </ActionSheet>
    </View>
  );
};

export default MissingPetForm;
