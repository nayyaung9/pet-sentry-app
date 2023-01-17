import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ThemeText from '~components/widgets/ThemeText';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputLabel from './InputLabel';
import genders from '~utils/constants/genders.json';

interface GenderProps {
  gender: string;
  onSelectGender: (name: string) => void;
}

const Gender = ({gender: selectedGender, onSelectGender}: GenderProps) => {
  const {colors} = useTheme();
  return (
    <View style={{paddingBottom: StyleConstants.Spacing.M}}>
      <InputLabel>Gender</InputLabel>
      <View style={[styles.root, {borderColor: colors.primary}]}>
        {Array.isArray(genders) &&
          genders.map((gender, index) => {
            const isSelectedGender = selectedGender == gender?.value;
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
                fontStyle={'S'}
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
