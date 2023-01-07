import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Button from '~components/widgets/Button';
import Gender from '~components/widgets/Gender';
import Input, {InputState} from '~components/widgets/Input';
import ActionSheet from '~components/widgets/ActionSheet';
import InputLabel from '~components/widgets/InputLabel';
import ThemeText from '~components/widgets/ThemeText';
import Select from '~components/widgets/Select';
import PhotoUploader from '~components/PhotoUploader';
import RBSheet from 'react-native-raw-bottom-sheet';

/** Utils and Scripts */
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleConstants} from '~utils/styles/constants';
import {useMissingPetMutation} from '~utils/queryHooks/timeline';
import {TabTimelineParamList} from '~utils/navigation/navigators';
import {StackNavigationProp} from '@react-navigation/stack';
import geolocation from '~utils/startup/geolocation';

/** JSON Data */
import collar_colors from '~utils/constants/collar_colors.json';
import pet_types from '~utils/constants/pet_types.json';
import genders from '~utils/constants/genders.json';

/** States */
import {useMapState} from '~utils/states/map.state';
import shallow from 'zustand/shallow';
import {useTheme} from '~utils/styles/ThemeManager';

const MissingPetForm = () => {
  const navigation = useNavigation<StackNavigationProp<TabTimelineParamList>>();

  const [pickedCoordinates, addressName, setMapState] = useMapState(
    state => [state.pickedCoordinates, state.addressName, state.setMapState],
    shallow,
  );

  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (async () => {
      const checkIsCoorinatesPicked =
        pickedCoordinates.latitude != 0 && pickedCoordinates.longitude != 0;

      if (checkIsCoorinatesPicked && !addressName) {
        const geolocationResponse = await geolocation();
        if (geolocationResponse) {
          setInitialRegion({
            latitude: geolocationResponse[0],
            longitude: geolocationResponse[1],
          });
        }
      }
    })();
  }, [navigation]);

  const actionSheetRef = useRef<RBSheet>(null);
  const petTypeActionSheetRef = useRef<RBSheet>(null);
  const {colors} = useTheme();

  const [petType, setPetType] = useState('');
  const [collarColor, setCollarColor] = useState('');
  const [gender, setGender] = useState(genders[0]?.value);

  const onSelectGender = (value: string) => setGender(value);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

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

  const onHandleCollarColor = (item: PetSentry.CollarColor) => {
    setCollarColor(item?.name);
    actionSheetRef.current?.close();
  };

  const onHandlePetType = (type: PetSentry.PetType) => {
    setPetType(type?.label);
    petTypeActionSheetRef.current?.close();
  };

  const {mutate: missingPetAction, isLoading} = useMissingPetMutation({
    onSuccess: () => {
      console.log('LoL Success');
    },
    onError: error => {
      console.log('mutation error', error);
    },
  });

  const onSubmitMissingPet = () => {
    return missingPetAction({
      petName,
      petType,
      gender,
      activityType: 'Missing',
      collarColor: collarColor || null,
      information: comment,
      specialTraits: traits,
      activityDate: date,
    });
  };

  const onCheckInitialRegionForMap = useCallback(() => {
    console.log(pickedCoordinates.latitude, 'init reg')
    if (pickedCoordinates.latitude && pickedCoordinates.longitude) {
      return {
        latitude: pickedCoordinates.latitude,
        longitude: pickedCoordinates.longitude,
      };
    }

    if(initialRegion.latitude && initialRegion.longitude) {
      return {
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
      };
    }
  }, [[pickedCoordinates, initialRegion]]);

  console.log('onCheckInitialRegionForMap', onCheckInitialRegionForMap())

  return (
    <ScrollView
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingVertical: StyleConstants.Spacing.M}}>
      <Gender {...{gender, onSelectGender}} />
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

      <View style={{paddingBottom: StyleConstants.Spacing.M}}>
        <InputLabel>Missing here</InputLabel>
        <TouchableOpacity
          disabled={
            initialRegion?.latitude == 0 && initialRegion?.longitude == 0
          }
          onPress={() =>
            navigation.navigate('Tab-Shared-Map', {
              isPin: true,
              point: onCheckInitialRegionForMap(),
            })
          }
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          }}>
          {initialRegion?.latitude == 0 && initialRegion?.longitude == 0 ? (
            <ActivityIndicator color={colors.textDisable} />
          ) : (
            <>
              <ThemeText>{addressName || 'Enter your address...'}</ThemeText>
              <Ionicons name="md-chevron-forward-outline" />
            </>
          )}
        </TouchableOpacity>
      </View>

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
      <PhotoUploader />

      <Input
        label="Special traits*"
        {...traitInputProps}
        helperText="Unusual color, behavior, etc"
      />

      <View style={{paddingBottom: StyleConstants.Spacing.M}}>
        <InputLabel>Lost Date</InputLabel>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          }}>
          <ThemeText>
            {date ? moment(date).format('DD, MMM, YYYY') : 'Select lost date'}
          </ThemeText>
        </TouchableOpacity>
      </View>

      <Input label="Comment" multiline {...commentInputProps} />

      <Button
        title="Post"
        disabled={isLoading}
        onPress={() => onSubmitMissingPet()}
      />

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

      <DatePicker
        modal
        mode={'date'}
        maximumDate={new Date()}
        minimumDate={new Date('2021-12-31')}
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingBottom: StyleConstants.Spacing.M,
  },
});
export default MissingPetForm;
