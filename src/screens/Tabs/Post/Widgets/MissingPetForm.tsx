import React, {useRef, useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Button from '~components/widgets/Button';
import Gender from '~components/widgets/Gender';
import Input, {InputState} from '~components/widgets/Input';
import ActionSheet from '~components/widgets/ActionSheet';
import InputLabel from '~components/widgets/InputLabel';
import ThemeText from '~components/widgets/ThemeText';
import Select from '~components/widgets/Select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleConstants} from '~utils/styles/constants';

import collar_colors from '~utils/constants/collar_colors.json';
import pet_types from '~utils/constants/pet_types.json';

interface CollarColorProps {
  id: number;
  name: string;
}
interface PetTypeProps {
  id: number;
  label: string;
}
const MissingPetForm = () => {
  const actionSheetRef = useRef<any>(null);
  const petTypeActionSheetRef = useRef<any>(null);

  const [petType, setPetType] = useState('');
  const [collarColor, setCollarColor] = useState('');

  const petNameInputRef = useRef<TextInput>(null);
  const [petName, setPetName] = useState('');
  const petNameInputProps: InputState['inputProps'][0] = {
    ref: petNameInputRef,
    value: [petName, setPetName],
    isFocused: useRef<boolean>(false),
    maxLength: 32,
  };

  const traitsInputRef = useRef<TextInput>(null);
  const [traits, setTraits] = useState('');
  const traitInputProps: InputState['inputProps'][0] = {
    ref: traitsInputRef,
    value: [traits, setTraits],
    isFocused: useRef<boolean>(false),
    maxLength: 120,
  };

  const commentInputRef = useRef<TextInput>(null);
  const [comment, setComment] = useState('');
  const commentInputProps: InputState['inputProps'][0] = {
    ref: commentInputRef,
    value: [comment, setComment],
    isFocused: useRef<boolean>(false),
    maxLength: 120,
  };

  const onHandleCollarColor = (item: CollarColorProps) => {
    setCollarColor(item?.name);
    actionSheetRef.current?.close();
  };

  const onHandlePetType = (type: PetTypeProps) => {
    setPetType(type?.label);
    petTypeActionSheetRef.current?.close();
  };

  const onSubmitMissingPet = () => {
    const payload = {
      petName,
      petType,
      collarColor: collarColor || null,
      traits,
    };
    console.log(payload);
  };

  return (
    <ScrollView
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingVertical: StyleConstants.Spacing.M}}>
      <Gender />
      <Input label="Pet name*" {...petNameInputProps} />

      <Select
        label="Pet type*"
        onPress={() => petTypeActionSheetRef.current?.open()}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <ThemeText>{petType || 'Select pet type...'}</ThemeText>
          <Ionicons name="md-chevron-forward-outline" />
        </View>
      </Select>

      {/* <Input label="Missing here*" /> */}

      <Select
        label="Collar Color"
        onPress={() => actionSheetRef.current?.open()}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <ThemeText>{collarColor || 'Select collar color...'}</ThemeText>
          <Ionicons name="md-chevron-forward-outline" />
        </View>
      </Select>

      <InputLabel noPadding>
        The more photos you add, the better the search will work
      </InputLabel>
      <Button
        title="Upload Photo"
        icon="md-camera-outline"
        onPress={() => console.log('Post')}
      />

      <Input
        label="Special traits*"
        {...traitInputProps}
        helperText="Unusual color, behavior, etc"
      />
      <ThemeText>Lost Date Here</ThemeText>
      <Input label="Comment" multiline {...commentInputProps} />
      <Button title="Post" onPress={() => onSubmitMissingPet()} />

      <ActionSheet ref={actionSheetRef}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: StyleConstants.Spacing.S}}
          data={collar_colors}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => onHandleCollarColor(item)}>
              <ThemeText color={'#rgba(0, 0, 0, 0.7)'}>{item?.name}</ThemeText>
            </TouchableOpacity>
          )}
        />
      </ActionSheet>

      <ActionSheet ref={petTypeActionSheetRef}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: StyleConstants.Spacing.S}}
          data={pet_types}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => onHandlePetType(item)}>
              <ThemeText color={'#rgba(0, 0, 0, 0.7)'}>{item?.label}</ThemeText>
            </TouchableOpacity>
          )}
        />
      </ActionSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingBottom: StyleConstants.Spacing.M,
  },
});
export default MissingPetForm;
