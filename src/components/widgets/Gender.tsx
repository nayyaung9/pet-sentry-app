import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ThemeText from '~components/widgets/ThemeText';
import {StyleConstants} from '~utils/styles/constants';
import {useTheme} from '~utils/styles/ThemeManager';

const genders = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
];
const Gender = () => {
  const {colors} = useTheme();
  const [state, setState] = useState(genders[0]?.value);

  const onSelectGender = (value: string) => setState(value);

  return (
    <View style={{paddingBottom: StyleConstants.Spacing.M}}>
      <ThemeText
        style={{paddingBottom: StyleConstants.Spacing.S}}
        fontWeight={'Medium'}>
        Gender
      </ThemeText>
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
                    ...(isSelectedGender
                      ? {
                          // color: '#fff',
                          backgroundColor: colors.primary,
                        }
                      : {
                          // color: '#000',
                        }),
                  },
                ]}>
                <ThemeText color={isSelectedGender ? '#fff' : '#000'}>
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
    borderWidth: 1,
    alignItems: 'center',
    width: '48%',
    paddingVertical: StyleConstants.Spacing.S,
    borderRadius: 100,
  },
});
export default Gender;
