import React, {useRef} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Button from '~components/widgets/Button';
import Gender from '~components/widgets/Gender';
import Input from '~components/widgets/Input';
import ActionSheet from '~components/widgets/ActionSheet';
import ThemeText from '~components/widgets/ThemeText';
import Select from '~components/widgets/Select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleConstants} from '~utils/styles/constants';

import collar_colors from '~utils/constants/collar_colors.json';
import InputLabel from '~components/widgets/InputLabel';

interface CollarItem {
  id: number;
  label: string;
}

const MissingPetForm = () => {
  const actionSheetRef = useRef<any>(null);
  return (
    <ScrollView
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingVertical: StyleConstants.Spacing.M}}>
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

      <InputLabel noPadding>
        The more photos you add, the better the search will work
      </InputLabel>
      <Button
        title="Upload Photo"
        icon="md-camera-outline"
        onPress={() => console.log('Post')}
        // buttonBackground={'rgba(236, 65, 122, 0.7)'}
      />

      <Input
        label="Special traits"
        maxLength={60}
        multiline
        helperText="Unusual color, behavior, etc"
      />
      <Input label="Comment" maxLength={120} multiline />
      <Button title="Post" onPress={() => console.log('Post')} />

      <ActionSheet ref={actionSheetRef}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={collar_colors}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => actionSheetRef.current?.close()}>
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
    paddingVertical: StyleConstants.Spacing.S,
  },
});
export default MissingPetForm;
