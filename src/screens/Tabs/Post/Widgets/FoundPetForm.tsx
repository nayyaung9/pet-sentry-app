import React, {useRef, useState} from 'react';
import {
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Gender from '~components/widgets/Gender';
import Input, {InputState} from '~components/widgets/Input';
import Select from '~components/widgets/Select';
import ThemeText from '~components/widgets/ThemeText';
import genders from '~utils/constants/genders.json';
import {StyleConstants} from '~utils/styles/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActionSheet from '~components/widgets/ActionSheet';
import pet_types from '~utils/constants/pet_types.json';
import collar_colors from '~utils/constants/collar_colors.json';
import InputLabel from '~components/widgets/InputLabel';
import Button from '~components/widgets/Button';
import {TextInput} from 'react-native-gesture-handler';

const FoundPetForm = () => {
  const actionSheetRef = useRef<any>(null);
  const petTypeActionSheetRef = useRef<any>(null);
  const [collarColor, setCollarColor] = useState('');
  const [gender, setGender] = useState(genders[0]?.value);

  const commentInputRef = useRef<TextInput>(null);
  const [comment, setComment] = useState('');
  const commentInputProps: InputState['inputProps'][0] = {
    ref: commentInputRef,
    value: [comment, setComment],
    isFocused: useRef<boolean>(false),
    maxLength: 120,
  };

  const [petType, setPetType] = useState('');
  const onSelectGender = (value: string) => setGender(value);

  const onHandlePetType = (type: PetSentry.PetType) => {
    setPetType(type?.label);
    petTypeActionSheetRef.current?.close();
  };

  const onHandleCollarColor = (item: PetSentry.CollarColor) => {
    setCollarColor(item?.name);
    actionSheetRef.current?.close();
  };

  return (
    <ScrollView
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingVertical: StyleConstants.Spacing.M}}>
      <Gender {...{gender, onSelectGender}} />

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

      <Input label="Comment" multiline {...commentInputProps} />

      <Button title="Post" onPress={() => console.log('POST')} />

      <ActionSheet ref={petTypeActionSheetRef} dataCount={pet_types}>
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
      <ActionSheet ref={actionSheetRef} dataCount={collar_colors}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingBottom: StyleConstants.Spacing.M,
  },
});
export default FoundPetForm;
