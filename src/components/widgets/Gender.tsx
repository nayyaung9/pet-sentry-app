import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ThemeText from '~components/widgets/ThemeText';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputLabel from './InputLabel';

const genders = [
  {label: 'Male', value: 'male', icon: 'md-male'},
  {label: 'Female', value: 'female', icon: 'md-female'},
];
const Gender = () => {
  const {colors} = useTheme();
  const [state, setState] = useState(genders[0]?.value);

  const onSelectGender = (value: string) => setState(value);

  return (
    <View style={{paddingBottom: StyleConstants.Spacing.M}}>
      <InputLabel>Gender</InputLabel>
      <View style={[styles.root, {borderColor: colors.primary}]}>
        {Array.isArray(genders) &&
          genders.map((gender, index) => {
            const isSelectedGender = state == gender?.value;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => onSelectGender(gender?.value)}
                style={[
                  styles.genderTab,
                  {
                    ...{borderColor: colors.primary},
                    ...(isSelectedGender && {
                      backgroundColor: colors.primary,
                    }),
                  },
                ]}>
                <Ionicons
                  name={gender?.icon}
                  size={20}
                  color={isSelectedGender ? '#fff' : colors.textSecondary}
                />
                <ThemeText
                  color={isSelectedGender ? '#fff' : colors.textSecondary}
                  style={{paddingLeft: StyleConstants.Spacing.S}}>
                  {gender?.label}
                </ThemeText>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  genderTab: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    paddingVertical: StyleConstants.Spacing.S,
    borderRadius: 100,
  },
});
export default Gender;
